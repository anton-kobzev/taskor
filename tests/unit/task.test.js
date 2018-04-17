const {app, chai, expect} = require('../common');

describe('Task CRUD operations', () => {

    it('GET all the tasks', (done) => {
        chai.request(app)
            .get('/api/tasks')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
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

    it('mark task done', (done) => {
        const task = {
            name: "Test task",
            description: "This is test task",
        };
        chai.request(app)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                chai.request(app)
                    .patch('/api/tasks/' + res.body.id)
                    .send({done: true})
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body.done).to.be.eql(true);
                        done();
                    });
            });
    });

});
