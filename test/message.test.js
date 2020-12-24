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

describe("/api/messages", async () => {
  it("should get all messages", async () => {
    const newUser = testConstants.generateUser();
    await testFunctions.registerUser(newUser);

    const loginResponse = await testFunctions.login(newUser);
    const res = await chai
      .request(server)
      .get(`/api/messages`)
      .set({ "x-access-token": loginResponse.token });
    const { body, statusCode } = res;
    expect(statusCode).to.equal(200);
    expect(body).to.be.an('array').that.have.lengthOf(0)
  });
  it("should not get all messages with invalid token", async () => {
    const res = await chai
      .request(server)
      .get(`/api/messages`)
      .set({ "x-access-token": "invalidToken" })
      const { statusCode } = res;
      expect(statusCode).to.equal(401);
  });

  it("should post new message", async () => {
    const user1 = testConstants.generateUser();
    const user2 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    await testFunctions.registerUser(user2);
    const loginResponse = await testFunctions.login(user1);
    const newMessage = testConstants.generateMessage(user1.username, user2.username)
    const {body, statusCode} = await testFunctions.postMessage(newMessage, loginResponse.token);
    expect(statusCode).to.equal(200);
    expect(body).to.have.property("_id");
    expect(body).to.have.property("sender_username");
    expect(body).to.have.property("receiver_username");
    expect(body).to.have.property("created_at");
    expect(body).to.have.property("message");
  });
  it("should not post new message with invalid message length", async () => {
    const user1 = testConstants.generateUser();
    const user2 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    await testFunctions.registerUser(user2);
    const loginResponse = await testFunctions.login(user1);
    const newMessage = testConstants.generateMessage(user1.username, user2.username, 500)
    const {statusCode} = await testFunctions.postMessage(newMessage, loginResponse.token);
    expect(statusCode).to.equal(400);
  });
  it("should not post new message with invalid sender user", async () => {
    const user1 = testConstants.generateUser();
    const user2 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    await testFunctions.registerUser(user2);
    const loginResponse = await testFunctions.login(user1);
    const newMessage = testConstants.generateMessage('invalidSender', user2.username)
    const {statusCode} = await testFunctions.postMessage(newMessage, loginResponse.token);
    expect(statusCode).to.equal(400);
  });
  it("should not post new message with invalid receiver user", async () => {
    const user1 = testConstants.generateUser();
    const user2 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    await testFunctions.registerUser(user2);
    const loginResponse = await testFunctions.login(user1);
    const newMessage = testConstants.generateMessage(user1.username, 'invalidReceiver')
    const {statusCode} = await testFunctions.postMessage(newMessage, loginResponse.token);
    expect(statusCode).to.equal(400);
  });
  it("should not post new message with invalid token", async () => {
    const user1 = testConstants.generateUser();
    const user2 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    await testFunctions.registerUser(user2);
    const newMessage = testConstants.generateMessage(user1.username, user2.username)
    const {statusCode} = await testFunctions.postMessage(newMessage, 'invalidToken');
    expect(statusCode).to.equal(401);
  });
});


describe("/api/messages/{id}", async () => {
  it("should get message with id", async () => {
    const user1 = testConstants.generateUser();
    const user2 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    await testFunctions.registerUser(user2);
    const loginResponse = await testFunctions.login(user1);
    const newMessage = testConstants.generateMessage(user1.username, user2.username)
    const {body: postedMessage} = await testFunctions.postMessage(newMessage, loginResponse.token);
     const { statusCode, body } = await chai
     .request(server)
     .get(`/api/messages/${postedMessage._id}`)
     .set({ "x-access-token": loginResponse.token })
     expect(statusCode).to.equal(200);
     expect(body).to.have.property("_id");
     expect(body).to.have.property("sender_username");
     expect(body).to.have.property("receiver_username");
     expect(body).to.have.property("created_at");
     expect(body).to.have.property("message");
  });
  it("should not get message with invalid token", async () => {
    const res = await chai
      .request(server)
      .get(`/api/messages/messageId`)
      .set({ "x-access-token": "invalidToken" })
      const { statusCode } = res;
      expect(statusCode).to.equal(401);
  });
  it("should not get message with invalid id", async () => {
    const user1 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    const loginResponse = await testFunctions.login(user1);
     const { statusCode, body } = await chai
     .request(server)
     .get(`/api/messages/invalidId`)
     .set({ "x-access-token": loginResponse.token })
     expect(statusCode).to.equal(400);
  });

  it("should delete message with id", async () => {
    const user1 = testConstants.generateUser();
    const user2 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    await testFunctions.registerUser(user2);
    const loginResponse = await testFunctions.login(user1);
    const newMessage = testConstants.generateMessage(user1.username, user2.username)
    const {body: postedMessage} = await testFunctions.postMessage(newMessage, loginResponse.token);
     const { statusCode, body } = await chai
     .request(server)
     .delete(`/api/messages/${postedMessage._id}`)
     .set({ "x-access-token": loginResponse.token })
     expect(statusCode).to.equal(204);
  });
  it("should not get delete with invalid token", async () => {
    const res = await chai
      .request(server)
      .delete(`/api/messages/messageId`)
      .set({ "x-access-token": "invalidToken" })
      const { statusCode } = res;
      expect(statusCode).to.equal(401);
  });
  it("should not delete message with invalid id", async () => {
    const user1 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    const loginResponse = await testFunctions.login(user1);
     const { statusCode, body } = await chai
     .request(server)
     .delete(`/api/messages/invalidId`)
     .set({ "x-access-token": loginResponse.token })
     expect(statusCode).to.equal(400);
  });

  it("should update message with id", async () => {
    const user1 = testConstants.generateUser();
    const user2 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    await testFunctions.registerUser(user2);
    const loginResponse = await testFunctions.login(user1);
    const newMessage = testConstants.generateMessage(user1.username, user2.username)
    const {body : postMessage} = await testFunctions.postMessage(newMessage, loginResponse.token);


     const { statusCode, body: updatedMessage } = await chai
     .request(server)
     .put(`/api/messages/${postMessage._id}`)
     .send({'message':'Updated Message'})
     .set({ "x-access-token": loginResponse.token })
     expect(statusCode).to.equal(200);
     expect(updatedMessage.message).to.eq('Updated Message')
     expect(updatedMessage._id).to.eq(postMessage._id)
     expect(updatedMessage.sender_username).to.eq(postMessage.sender_username)
     expect(updatedMessage.receiver_username).to.eq(postMessage.receiver_username)
     expect(updatedMessage.created_at).to.eq(postMessage.created_at)
  });
  it("should not update message with invalid token", async () => {
    const res = await chai
      .request(server)
      .put(`/api/messages/messageId`)
      .set({ "x-access-token": "invalidToken" })
      const { statusCode } = res;
      expect(statusCode).to.equal(401);
  });
  it("should not update message with invalid id", async () => {
    const user1 = testConstants.generateUser();
    await testFunctions.registerUser(user1);
    const loginResponse = await testFunctions.login(user1);
     const { statusCode, body } = await chai
     .request(server)
     .put(`/api/messages/invalidId`)
     .set({ "x-access-token": loginResponse.token })
     expect(statusCode).to.equal(400);
  });

});