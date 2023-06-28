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
		SuccessResponse.messages = "Sign In Successful";
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
};