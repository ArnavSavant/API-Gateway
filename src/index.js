const express = require("express");
const rateLimit = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { serverConfig, Logger } = require("./config");
const routes = require("./routes");

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 50, // Limit each IP to 5 requests per `window` (here, per 2 minutes)
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(limiter);
app.use(
	"/flightService",
	createProxyMiddleware({
		target: serverConfig.FLIGHT_SERVICE,
		changeOrigin: true,
		pathRewrite: { "^/flightService": "/" },
	})
);
app.use(
	"/bookingService",
	createProxyMiddleware({
		target: serverConfig.BOOKING_SERVICE,
		changeOrigin: true,
		pathRewrite: { "^/bookingService": "/" },
	})
);
app.use("/api", routes);

app.listen(serverConfig.PORT, () => {
	console.log(`Succesfully listening on PORT: ${serverConfig.PORT}`);
});
