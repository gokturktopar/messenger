const express = require("express");
const router = express.Router();
const userLogService = require("@services/userLog");

router.get("/:username", async (req, res, next) => {
  try {
    const userLogs = await userLogService.getAll(req.params.username);
    res.json(userLogs);
  } catch (e) {
    res.status(400).json(e);

  }
});

module.exports = router;
