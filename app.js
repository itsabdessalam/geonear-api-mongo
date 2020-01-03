const dotenv = require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

// CORS
app.use(cors());

// Log
app.use(logger("dev"));

// security
app.use(helmet());

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// database connection
mongoose.connect(
	process.env.DB_URL,
	{ useCreateIndex: true, useNewUrlParser: true },
	error => {
		if (error) {
			throw error;
		}
		console.log("🚀 Successfully connected to database !");
	}
);

// routes
app.use(require("./routes"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404, `Cannot ${req.method} ${req.originalUrl}`));
});

// error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
