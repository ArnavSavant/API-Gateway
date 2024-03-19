const express = require("express");

const router = express.Router();
const { AuthMiddlewares } = require("../../middlewares");
const { infoController } = require("../../controllers");

const userRoutes = require("./user-routes");

// router.get("/info", AuthMiddlewares.checkAuthentication, infoController.info);
router.get("/info",infoController.info);
router.use("/user", userRoutes);

module.exports = router;
