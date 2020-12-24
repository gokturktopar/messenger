const express = require("express");
const router = express.Router();
const userService = require("../services/user");

router.get("/", async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (e) {
    res.status(400).json(e);

  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await userService.deleteById(req.params.id);
    res.status(204).send(user);
  } catch (e) {
    res.status(400).json(e);

  }
});
router.put("/block-user", async (req, res, next) => {
  try {
    const user = await userService.blockUser(req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json(e);

  }
});

module.exports = router;
