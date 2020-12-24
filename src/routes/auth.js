const express = require("express");
const router = express.Router();
const service = require("@services/auth");
const userLogService = require("@services/userLog");



router.post("/login", async (req, res, next) => {
  try {
    const response = await service.login(req.body);
    res.status(200).send(response);
    userLogService.addNewLog({username: response.username, logType:'successful_logins', date:Date.now()})
  } catch (e) {
    userLogService.addNewLog({username: req.body.username, logType:'failed_logins', date:Date.now()})
    res.status(400).json(e);
  }
});
router.post("/register", async (req, res, next) => {
  try {
    const result = await service.register(req.body);
    res.status(200).send(result);
    userLogService.addCreatedAt({username: result.username, date:Date.now()})
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
