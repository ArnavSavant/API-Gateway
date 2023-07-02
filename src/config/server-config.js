const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	PORT: parseInt(process.env.PORT),
	SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRY: process.env.JWT_EXPIRY,
	FLIGHT_SERVICE: process.env.FLIGHT_SERVICE,
	BOOKING_SERVICE: process.env.BOOKING_SERVICE,
};
