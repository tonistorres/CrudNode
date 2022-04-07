const express = require("express");
const UserController = require('../controllers/controller.user');
const router = express.Router();

router
  .get('/', UserController.getAllController)
  .get('/:id', UserController.getByIdController)
  .post('/', UserController.createController)
  .post('/login/', UserController.getLoginController)
  .put('/:id', UserController.updateController)
  .delete('/:id', UserController.deleteByIdController);
  

module.exports = router;