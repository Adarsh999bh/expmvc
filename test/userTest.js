/* ************************************************************************
 * Execution        : 1. default node  cmd> mocha             
 * @descrition      : sets up the testing functions for user
 * @file            : userTest.js
 * @author          : Adarsh Bhandary
 * @version         : 1.0
 * @since           : 7-Dec-2021
 * 
 **************************************************************************/

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
chai.use(chaiHttp);
chai.should();
const userCred=require('./userTest.json')
/**
 * /POST request test
 * positive and negative - login test
 */
describe("POST user /registeration", () => {
    let userId;
    it("positive test case for registeration", (done) => {
        chai
            .request(server)
            .post("/user/create")
            .send(userCred.positiveRegistration)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                userId = res.body._id;
                if (err) {
                    return done(err);
                }
                done();
            });
    });


    it("positive test case for deletion", (done) => {
        chai
            .request(server)
            .delete("/user/deleteuser/" + userId)
            .send()
            .end((err, res) => {
                res.should.have.status(204);
                res.body.should.be.a("object");
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it("negetive test case for deletion", (done) => {
        chai
            .request(server)
            .delete("/user/deleteuser/" + userId + "5")
            .send()
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("object");
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it("Negative test case for registeration", (done) => {
        chai
            .request(server)
            .post("/user/create")
            .send(userCred.negetiveRegistration)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
/**
 * /POST request test
 * positive and negative - login test
 */
describe("POST user /login", () => {
    it("positive test case ", (done) => {
        chai
            .request(server)
            .post("/user/login")
            .send(userCred.positiveLogin)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("token");
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it("Negative test case", (done) => {
        chai
            .request(server)
            .post("/user/login")
            .send(userCred.negetiveLogin)
            .end((err, res) => {
                res.should.have.status(401);
                res.should.have.property('text').eql("Password mismatch");
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});