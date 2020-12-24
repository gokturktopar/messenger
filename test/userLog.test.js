const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const testConstants = require("./_test.constants");
const testFunctions = require("./_test.functions");
const database = require("./_database");

let server = require("../app");
const { login } = require("./_test.functions");
chai.use(chaiHttp);

afterEach(async () => {
  await database.clearDb();
}); 

describe("/api/user-logs", async () => {
  it("should add created_at and successful logins to logs", async () => {
    const newUser = testConstants.generateUser();
    const registerRes = await testFunctions.registerUser(newUser);
    const loginResponse = await testFunctions.login(newUser);
    const res = await chai
      .request(server)
      .get(`/api/user-logs/${registerRes.username}`)
      .set({ "x-access-token": loginResponse.token });
    const { body, statusCode } = res;
    expect(statusCode).to.equal(200);
    expect(body).to.have.property("created_at");
    expect(body.successful_logins).to.have.lengthOf(1);
  });
  it("should return invalid token error", async () => {
    const newUser = testConstants.generateUser();
    const registerRes = await testFunctions.registerUser(newUser);
    const res = await chai
      .request(server)
      .get(`/api/user-logs/${registerRes.username}`)
      .set({ "x-access-token": "invalidToken" })
      const { statusCode } = res;
      expect(statusCode).to.equal(401);
  });
  it("should add failed_logins to logs", async () => {
    const newUser = testConstants.generateUser();
    const registerRes = await testFunctions.registerUser(newUser);
    await login({ username: newUser.username, password: "wrongpass" });
    const loginResponse = await testFunctions.login(newUser);
    const { body, statusCode } = await chai
      .request(server)
      .get(`/api/user-logs/${registerRes.username}`)
      .set({ "x-access-token": loginResponse.token })
      expect(statusCode).to.equal(200);
      expect(body.failed_logins).to.be.an("array").that.lengthOf(1);
  });
});
