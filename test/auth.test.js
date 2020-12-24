const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const testConstants = require("./_test.constants");
let server = require("../app");
const testFunctions = require("./_test.functions");
chai.use(chaiHttp);
const database = require("./_database");
const { after } = require("mocha");

const checkUser = (item) => {
  expect(item).to.have.property("_id");
  expect(item).to.have.property("username");
};
after(async () => {
  await database.clearDb();
}); 

describe("/api/auth", () => {
  it("should register user", (done) => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send(testConstants.generateUser())
      .end((err, res) => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(200);
        checkUser(body);
        done();
      });
  });
  it("should not register new user without username", (done) => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send({password:"password123"})
      .end((err, res) => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(400);
        done();
      });
  });
  it("should not register new user with invalid username length", (done) => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send(testConstants.generateUser(1))
      .end((err, res) => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(400);
        done();
      });
  });
  it("should login user", async () => {
    const newUser = testConstants.generateUser();
    await testFunctions.registerUser(newUser);
    const response = await chai
      .request(server)
      .post("/api/auth/login")
      .send(newUser)
      const { body, statusCode } = response;
      expect(statusCode).to.equal(200);
      expect(body).to.have.property("_id");
      expect(body).to.have.property("username");
      expect(body).to.have.property("token");

  });
  it("should not login with invalid user", (done) => {
    chai
    .request(server)
    .post("/api/auth/login")
    .send({username:'invalidUsername', password:"1234"})
    .end((err, res) => {
      const { body, statusCode } = res;
      expect(statusCode).to.equal(400);
      done();
    });
  });
});
