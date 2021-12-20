/* ************************************************************************
 * Execution        : 1. default node  cmd> mocha             
 * @descrition      : sets up the testing functions for note
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
const noteCred=require('./noteTest.json')

describe("Note create, read, update and delete", () => {
    let token;
    let cardId;
    beforeEach(done => {
        // let data = {
        //     email: "mux@gmail.com",
        //     password: "muxMUXmux",
        // };
        chai
            .request(server)
            .post("/user/login")
            .send(noteCred.login)
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it("positive test case for creation of note. Route:/notes/create", (done) => {
        // let note={
        //     title:"exor",
        //     content:"worldddddd",
        // }
        chai
            .request(server)
            .post("/notes/create")
            .set("Authorization","bearer "+token)
            .send(noteCred.createNote)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                cardId=res.body._id
                if (err) {
                    return done(err);
                  }
                done();
            });
    });
    it("positive test case for updation of note. Route:/notes/update", (done) => {
        let note={
            cardId:cardId,
            title:"haa",
            content:"worldddddd",
            color:"rgb(215, 174, 251)",
            imgFile:"",
        }
        chai
            .request(server)
            .put("/notes/update")
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
    it("positive test case for deletion of note. Route:/notes/delete", (done) => {
        let note={
            cardId:cardId,
        }
        chai
            .request(server)
            .delete("/notes/delete")
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
    it("positive test case for getting note. Route:/notes/getote", (done) => {
        chai
            .request(server)
            .get("/notes/getnote")
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