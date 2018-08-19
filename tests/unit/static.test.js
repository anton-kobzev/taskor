const { app, chai, expect } = require("../common")

describe("Static files serving", function() {
    it("homepage html available", done => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.html
                expect(res.text).to.include("<title>Taskor</title>")
                expect(res.text).to.include('<div id="root"')
                done()
            })
    })

    it("css styles available", done => {
        chai.request(app)
            .get("/css/style.css")
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it("js bundle available", done => {
        chai.request(app)
            .get("/js/bundle.js")
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
})
