import cors from "cors";
import express from "express";
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";

const CONNECTION_STRING =
	process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/lcp";

mongoose
	.connect(CONNECTION_STRING)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Failed to connect to MongoDB", err));

const app = express();

app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000" || process.env.NETLIFY_URL,
	})
);

const sessionOptions = {
	secret: process.env.SESSION_SECRET || "lcp",
	resave: false,
	saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
		domain: process.env.NODE_SERVER_DOMAIN,
	};
}

app.use(session(sessionOptions));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to Long Cove Point!");
});

process.on("SIGINT", () => {
	server.close();
	mongoose.disconnect();
	console.log("Server closed. Database instance disconnected");
	process.exit(0);
});

app.listen(process.env.PORT || 4000);
