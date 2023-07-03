"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User_Roles extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User_Roles.init(
		{
			user_Id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			role_Id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "User_Roles",
		}
	);
	return User_Roles;
};