const {app, chai, expect} = require('../common');

describe('Productivity analyze', () => {

    it('statistics', (done) => {
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

});
