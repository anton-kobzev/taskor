const {app, chai, expect} = require('../common');

describe('Productivity analyze', () => {

    beforeEach(() => {
        app.models.Task.destroyAll();
    });

    it('done tasks exist', (done) => {
        const task = {
            name: "Test",
            estimateTime: 10,
            actualTime: 5,
            done: true,
        };
        chai.request(app)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(200);
                chai.request(app)
                    .get('/api/tasks/analyze')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('result');
                        expect(res.body.result.level).to.be.eql(2);
                        done();
                    });
            });
    });

    it('done tasks not exist', (done) => {
        const task = {
            name: "Test",
            estimateTime: 10,
            actualTime: 5,
            done: false,
        };
        chai.request(app)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                expect(res).to.have.status(200);
                chai.request(app)
                    .get('/api/tasks/analyze')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('result');
                        expect(res.body.result.level).to.be.eql(0);
                        done();
                    });
            });
    });

});
