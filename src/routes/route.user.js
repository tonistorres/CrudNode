const express = require("express");
const UserController = require('../controllers/controller.user');
const Authorization = require('../middleware/ authorization');
const router = express.Router();

router
  .get('/', Authorization, UserController.getAllController)
  .get('/:id',Authorization, UserController.getByIdController)
  .post('/', Authorization, UserController.createController)
  .post('/login/', UserController.getLoginController)
  .put('/:id', Authorization, UserController.updateController)
  .delete('/:id', Authorization, UserController.deleteByIdController);
  

module.exports = router;