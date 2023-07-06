const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const {UserService} = require('../services');

async function signup(req, res) {
	try {
		const user = await UserService.createUser({
			email: req.body.email,
         password: req.body.password,
		});
		SuccessResponse.messages = "User Created SuccessFully";
		SuccessResponse.data = user;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

async function signin(req, res) {
	try {
		const user = await UserService.signIn({
			email: req.body.email,
			password: req.body.password,
		});
		SuccessResponse.messages = "Sign In Successfully";
		SuccessResponse.data = user;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}
async function addRoleToUser(req,res) {
	console.log("inside controller");
	try {
		const user = await UserService.addRole({
			id: req.body.id,
			role: req.body.role,
		});
		SuccessResponse.messages = "Role assigned successfully";
		SuccessResponse.data = user;
		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
}

module.exports = {
	signup,
	signin,
	addRoleToUser
};