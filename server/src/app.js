// Import necessary modules from the 'express' framework
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';



// Create an instance of the Express application
const app = express();

// Configure CORS (Cross-Origin Resource Sharing) middleware
// - 'origin': specifies the allowed origins for cross-origin resource sharing
// - 'credentials': indicates whether credentials (e.g., cookies) should be sent with the request
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Configure middleware for parsing JSON data in requests
app.use(express.json({ limit: '30kb' }));

// Configure middleware for parsing URL-encoded data in requests
app.use(express.urlencoded({ extended: true, limit: '30kb' }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Configure middleware for parsing cookies in requests
app.use(cookieParser());

// Export the configured Express application
// (This allows using the 'app' instance in other files/modules)
export { app };
