import express from 'express';
import cors from 'cors';
import routes from '../routes/index.js';

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use('/api', routes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
