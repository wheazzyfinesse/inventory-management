// NODE MODULE IMPORTS
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from "morgan";
import bodyParser from 'body-parser';
// ROUTE IMPORTS
import dashboardRoutes from "./routes/dashboardRoutes";

// CONFIGURATIONS AND INITIALIZATION
dotenv.config()
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(cors());

// ROUTES
app.use("/dashboard", dashboardRoutes)
// SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});