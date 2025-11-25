import http from 'http';
import { app } from "./app.js";
import { connectDB } from './src/config/db.js';

const port = process.env.PORT || 3000 || 5000;
const server = http.createServer(app);

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  })
});

