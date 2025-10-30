import "reflect-metadata";

import express, {Request, Response, Express} from 'express';
import { addRoutes } from "./src/config/routes.config";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { responseFormatter } from "./src/middleware/responseFormatter.middleware";
import cors, { CorsOptions} from "cors";

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3001;

// for production
// let corsOptions: CorsOptions = {
//   origin: "http://example.com", // replace with your production domain
// }
// app.use(cors(corsOptions));

// for development
app.use(cors())
app.use(express.json());
app.use(responseFormatter);

addRoutes(app);

async function bootstrap() {
  if (!process.env.DATABASE_URL || !process.env.DATABASE_NAME) {
    throw new Error("Cannot read environment variables for database connection");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL,
      {
        dbName: process.env.DATABASE_NAME,
      }
    );
    console.log('Connected to MongoDB');
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

bootstrap();
