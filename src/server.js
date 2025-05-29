// src/server.js
import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";

const CONNECTION_STRING =
	process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/lcp";

const PORT = process.env.PORT || 4000;

(async () => {
	try {
		await mongoose.connect(CONNECTION_STRING);
		console.log("Connected to MongoDB");

		const server = app.listen(PORT, () =>
			console.log(`LCP API listening on http://localhost:${PORT}`)
		);

		/* Graceful shutdown */
		process.on("SIGINT", async () => {
			await mongoose.disconnect();
			server.close(() => {
				console.log("Server closed. Database disconnected.");
				process.exit(0);
			});
		});
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
})();
