const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const testConstants = require("./_test.constants");
const testFunctions = require("./_test.functions");
let server = require("../app");
chai.use(chaiHttp);

const database = require("./_database");

afterEach(async () => {
  await database.clearDb();
}); 
describe("/api/users", async () => {
  it("should get all users", async () => {
    const newUser = testConstants.generateUser();
    const registerRes = await testFunctions.registerUser(newUser);
    const loginResponse = await testFunctions.login(newUser);
    const res = await chai
      .request(server)
      .get(`/api/users`)
      .set({ "x-access-token": loginResponse.token });
    const { body, statusCode } = res;
    expect(statusCode).to.equal(200);
    expect(body).to.have.lengthOf(1);
  });
  it("should return invalid token error", async () => {
    const res = await chai
      .request(server)
      .get(`/api/users`)
      .set({ "x-access-token": "invalidToken" })
      const { statusCode } = res;
      expect(statusCode).to.equal(401);
  });
});


describe("/api/users/{id}", async () => {
  it("should get user with id", async () => {
    const newUser = testConstants.generateUser();
     await testFunctions.registerUser(newUser);
    const loginResponse = await testFunctions.login(newUser);
    const res = await chai
      .request(server)
      .get(`/api/users/${loginResponse._id}`)
      .set({ "x-access-token": loginResponse.token });
    const { body, statusCode } = res;
    expect(statusCode).to.equal(200);
    expect(body).to.have.property("_id");
    expect(body).to.have.property("username");
    expect(body).to.have.property("blocked_users");
  });
  it("should get error for getting user with wrong id", async () => {
    const newUser = testConstants.generateUser();
     await testFunctions.registerUser(newUser);
    const loginResponse = await testFunctions.login(newUser);
    const res = await chai
      .request(server)
      .get(`/api/users/wrongID`)
      .set({ "x-access-token": loginResponse.token });
    const { body, statusCode } = res;
    expect(statusCode).to.equal(400);
  });
  it("should delete user with id", async () => {
    const newUser = testConstants.generateUser();
     await testFunctions.registerUser(newUser);
    const loginResponse = await testFunctions.login(newUser);
    const res = await chai
      .request(server)
      .delete(`/api/users/${loginResponse._id}`)
      .set({ "x-access-token": loginResponse.token });
    const { body, statusCode } = res;
    expect(statusCode).to.equal(204);
  });
  it("should get invalid token for deleting user with id", async () => {
    const newUser = testConstants.generateUser();
     await testFunctions.registerUser(newUser);
    const loginResponse = await testFunctions.login(newUser);
    const res = await chai
      .request(server)
      .delete(`/api/users/${loginResponse._id}`)
      .set({ "x-access-token": 'invalidtoken' });
    const { statusCode } = res;
    expect(statusCode).to.equal(401);
  });
  it("should get error for deleting user with wrong id", async () => {
    const newUser = testConstants.generateUser();
     await testFunctions.registerUser(newUser);
    const loginResponse = await testFunctions.login(newUser);
    const res = await chai
      .request(server)
      .delete(`/api/users/wrongID`)
      .set({ "x-access-token": loginResponse.token });
    const { body, statusCode } = res;
    expect(statusCode).to.equal(400);
  });
});


describe("/api/users/block-user", async () => {
  it("should block user", async () => {
    const userBlocker = testConstants.generateUser();
    const userBlocked = testConstants.generateUser();
     await testFunctions.registerUser(userBlocker);
     await testFunctions.registerUser(userBlocked);
    const loginResponse = await testFunctions.login(userBlocker);
    const {statusCode: blockStatusCode} = await testFunctions.blockUser({blocker_username:userBlocker.username, blocked_username:userBlocked.username, token:loginResponse.token})
    expect(blockStatusCode).to.equal(200);
    const getUserResponse = await testFunctions.getUser(loginResponse._id, loginResponse.token);
    expect(getUserResponse.body.blocked_users[0]).to.eq(userBlocked.username)
  });
  it("should not block user with wrong blocker username", async () => {
    const userBlocker = testConstants.generateUser();
    const userBlocked = testConstants.generateUser();
     await testFunctions.registerUser(userBlocker);
     await testFunctions.registerUser(userBlocked);
    const loginResponse = await testFunctions.login(userBlocker);
    const {statusCode: blockStatusCode} = await testFunctions.blockUser({blocker_username:'wrong name', blocked_username:userBlocked.username, token:loginResponse.token})
    expect(blockStatusCode).to.equal(400);
  });
  it("should not block user with wrong blocked username", async () => {
    const userBlocker = testConstants.generateUser();
    const userBlocked = testConstants.generateUser();
     await testFunctions.registerUser(userBlocker);
     await testFunctions.registerUser(userBlocked);
    const loginResponse = await testFunctions.login(userBlocker);
    const {statusCode: blockStatusCode} = await testFunctions.blockUser({blocker_username:userBlocker.username, blocked_username:'wrong name', token:loginResponse.token})
    expect(blockStatusCode).to.equal(400);
  });
});