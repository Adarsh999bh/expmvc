/* ************************************************************************
 * Execution        : 1. default node  cmd> mocha             
 * @descrition      : sets up the testing functions for label
 * @file            : noteTest.js
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
const labelCred=require('./labelTest.json');

describe("Label create, read, update and delete", () => {
    let token;
    let labelId;
    beforeEach(done => {
        // let data = {
        //     email: "mux@gmail.com",
        //     password: "muxMUXmux",
        // };
        chai
            .request(server)
            .post("/user/login")
            .send(labelCred.login)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it("positive test case for creation of label. Route:/label/create-label", (done) => {
        // let note={
        //     label:"Studentyyy"
        // }
        chai
            .request(server)
            .post("/label/create-label")
            .set("Authorization","bearer "+token)
            .send(labelCred.createLabel)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                labelId=res.body._id
                if (err) {
                    return done(err);
                  }
                done();
            });
    });
    it("positive test case for updation of label. Route:/label/update-label", (done) => {
        // let note={
        //     label:"Studddd"
        // }
        chai
            .request(server)
            .put("/label/update-label")
            .set("Authorization","bearer "+token)
            .send(labelCred.updateLabel)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                if (err) {
                    return done(err);
                  }
                done();
            });
    });
    it("positive test case for deletion of label. Route:/label/delete-label", (done) => {
        let note={
            labelId:labelId,
        }
        chai
            .request(server)
            .delete("/label/delete-label")
            .set("Authorization","bearer "+token)
            .send(note)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                if (err) {
                    return done(err);
                  }
                done();
            });
    });
    it("positive test case for getting label. Route:/label/get-label", (done) => {
        chai
            .request(server)
            .get("/label/get-label")
            .set("Authorization","bearer "+token)
            .send()
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("array");
                if (err) {
                    return done(err);
                  }
                done();
            });
    });
});