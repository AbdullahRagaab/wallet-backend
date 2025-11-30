// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import rateLimit from 'express-rate-limit';

// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import walletRoutes from './routes/walletRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
// import errorHandler from './middleware/errorHandler.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB();
// // last update in sha allah
// app.use(
//   cors({
//     origin: process.env.CLIENTURL || 'http://localhost:5173',
//     credentials: true,
//   }),
// );
// app.use(helmet());
// app.use(express.json({ limit: '1mb' }));
// app.use(morgan('dev'));

// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: 'Too many requests, please try again later.',
// });

// app.use('/api', apiLimiter);

// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: Date.now() });
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/wallet', walletRoutes);
// app.use('/api/admin', adminRoutes);

// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });













import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// connectDB();

// CORS
app.use(
  cors({
    origin: process.env.CLIENTURL || 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
});

app.use('/api', apiLimiter);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// *** مهم جداً ***
app.get('/', (req, res) => {
  res.send('🚀 Welcome to Digital Wallet API');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);

// Error Handler
app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });


const startServer = async () => {
  try {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('DB Connected!');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('DB Connection Failed:', err);
    process.exit(1);
  }
};

startServer();








// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import rateLimit from 'express-rate-limit';

// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import walletRoutes from './routes/walletRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
// import errorHandler from './middleware/errorHandler.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // ------------------------
// // CORS Configuration
// // ------------------------
// app.use(
//   cors({
//     origin: [
//       process.env.CLIENTURL,              // Netlify front-end
//       'http://localhost:5173',            // Local dev front-end
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// // Allow preflight requests
// app.options('*', cors());

// // ------------------------
// // Middleware
// // ------------------------
// app.use(helmet());
// app.use(express.json({ limit: '1mb' }));
// app.use(morgan('dev'));

// // ------------------------
// // Rate Limiter
// // ------------------------
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: 'Too many requests, please try again later.',
// });

// app.use('/api', apiLimiter);

// // ------------------------
// // Health Check & Root
// // ------------------------
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: Date.now() });
// });

// app.get('/', (req, res) => {
//   res.send('🚀 Welcome to Digital Wallet API');
// });

// // ------------------------
// // API Routes
// // ------------------------
// app.use('/api/auth', authRoutes);
// app.use('/api/wallet', walletRoutes);
// app.use('/api/admin', adminRoutes);

// // ------------------------
// // Error Handler
// // ------------------------
// app.use(errorHandler);

// // ------------------------
// // Start Server
// // ------------------------
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
