const {app, chai, expect} = require('../common');

const Task = app.models.Task;

describe('Task CRUD operations', function() {

    it('GET all the tasks', (done) => {
        chai.request(app)
            .get('/api/tasks')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.eql(0);
                done();
            });
    });

    it('POST a task with minimal required fields', (done) => {
        const task = {
            name: "Test task",
            description: "This is test task",
        };
        chai.request(app)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('description');
                done();
            });
    });

    it('not POST a task without name', (done) => {
        const task = {
            description: "This is test task",
        };
        chai.request(app)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error');
                done();
            });
    });

});
