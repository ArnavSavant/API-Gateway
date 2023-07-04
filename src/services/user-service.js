const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { Auth } = require("../utils/common");
const Enum = require("../utils/common/enum");
const { UserRepository,RoleRepository } = require("../repositories");
const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
async function createUser(data) {
	try {
		const user = await userRepository.create(data);
		const role = await roleRepository.getRoleByName(Enum.USER_ROLES.CUSTOMER);
		user.addRole(role);
		return user;
	} catch (error) {
		if (
			error.name == "SequelizeValidationError" ||
			error.name == "SequelizeUniqueConstraintError"
		) {
			let explanation = [];
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Cannot Create an User",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
async function signIn(data) {
	try {
		const user = await userRepository.getUserByEmail(data.email);
		if (!user) {
			throw new AppError(
				"User not found with following email",
				StatusCodes.NOT_FOUND
			);
		}
		const passwordMatch = Auth.checkPassword(data.password, user.password);
		if (!passwordMatch) {
			throw new AppError("Invalid Password", StatusCodes.BAD_REQUEST);
		}
		const jwt = Auth.createToken({ id: user.id, email: user.email });
		return jwt;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function isAuthenticated(token) {
	try {
		if (!token) {
			throw new AppError("JWT token missing", StatusCodes.BAD_REQUEST);
		}
		const response = Auth.verifyToken(token);
		const user = await userRepository.get(response.id);
		if (!user) {
			throw new AppError("No user found", StatusCodes.NOT_FOUND);
		}
		return user.id;
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}
		if (error.name == "JsonWebTokenError") {
			throw new AppError("Invalid JWT token", StatusCodes.BAD_REQUEST);
		}
		console.log(error);
		throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
module.exports = {
	createUser,
	signIn,
	isAuthenticated
};
