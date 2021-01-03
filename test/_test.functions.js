let server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const login = async (user) => {
  const {body} = await chai
  .request(server)
  .post("/api/auth/login")
  .send(user)
  return body
};
const registerUser = async (user) => {
  const {body} = await chai
  .request(server)
  .post("/api/auth/register")
  .send(user)
  return body
}

const blockUser = async ({blocked_username, blocker_username, token}) => {
  const {body, statusCode} = await chai
  .request(server)
  .put("/api/users/block-user")
  .send({blocker_username, blocked_username})
  .set({ "x-access-token": token });
  return {body,statusCode}
}

const getUser = async (userId,token) => {
  const {body,statusCode} = await chai
  .request(server)
  .get(`/api/users/${userId}`)
  .set({ "x-access-token": token });
  return {body, statusCode}
}

const postMessage = async(message, token) => {
  const {body,statusCode} = await chai
  .request(server)
  .post(`/api/messages`)
  .send(message)
  .set({ "x-access-token": token });
  return {body, statusCode}
}

module.exports = {
  login,
  registerUser,
  getUser,
  blockUser,
  postMessage
};
