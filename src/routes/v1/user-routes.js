const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");

router.post(
	"/signup",
	AuthMiddlewares.validateAuthRequest,
	userController.signup
);
router.post(
	"/signin",
	AuthMiddlewares.validateAuthRequest,
	userController.signin
);

router.post(
	"/role",
	AuthMiddlewares.checkAuthentication,
	AuthMiddlewares.isAdmin,
	userController.addRoleToUser
);

module.exports = router;
