import cors from "cors";
import express from "express";
import session from "express-session";

import userRoutes from "./api/Users/routes.js";
import cottageRoutes from "./api/Cottages/routes.js";
import unitRoutes from "./api/Units/routes.js";
import bookingRoutes from "./api/Bookings/routes.js";
import blockRoutes from "./api/AvailabilityBlocks/routes.js";

const app = express();

app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
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

app.get("/", (_req, res) => {
	res.send("Welcome to Long Cove Point!");
});
app.use("/api/users", userRoutes);
app.use("/api/cottages", cottageRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/availability-blocks", blockRoutes);

/* 404 fallback */
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

export default app;
