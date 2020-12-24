const express = require("express");
const router = express.Router();
const messageService = require("@services/message");

router.get("/", async (req, res, next) => {
  try {
    const messages = await messageService.getAll(req.query);
    res.json(messages);
  } catch (e) {
    res.status(400).json(e);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const result = await messageService.post(req.body);
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const message = await messageService.getById(req.params.id);
    res.json(message);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await messageService.deleteById(req.params.id);
    res.status(204).send(result);
  } catch (e) {
    res.status(400).json(e);

  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const result = await messageService.update(req.params.id, req.body);
    res.json(result);
  } catch (e) {
    res.status(400).json(e);

  }
});

module.exports = router;
