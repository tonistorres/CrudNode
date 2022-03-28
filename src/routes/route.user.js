const express = require("express");
const UserController = require('../controllers/controller.user');
const router = express.Router();

router
  .get('/', UserController.getAllController)
  .post('/', UserController.createController)
  .delete('/:id', UserController.deleteByIdController);

module.exports = router;