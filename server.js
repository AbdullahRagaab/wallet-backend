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
// const PORT = process.env.PORT || 5001;

// // connectDB();

// // CORS
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

// // Health Check
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: Date.now() });
// });

// // *** مهم جداً ***
// app.get('/', (req, res) => {
//   res.send('🚀 Welcome to Digital Wallet API');
// });

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/wallet', walletRoutes);
// app.use('/api/admin', adminRoutes);

// // Error Handler
// app.use(errorHandler);

// // app.listen(PORT, () => {
// //   console.log(`Server listening on port ${PORT}`);
// // });


// const startServer = async () => {
//   try {
//     console.log('Connecting to DB...');
//     await connectDB();
//     console.log('DB Connected!');

//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('DB Connection Failed:', err);
//     process.exit(1);
//   }
// };

// startServer();







// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import morgan from 'morgan';

// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import walletRoutes from './routes/walletRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

// dotenv.config();

// const app = express();

// // Middlewares
// app.use(express.json());
// app.use(cors());
// app.use(helmet());
// app.use(morgan('dev'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/wallet', walletRoutes);
// app.use('/api/admin', adminRoutes);

// // Health check
// app.get('/health', (req, res) => {
//   res.json({ ok: true });
// });

// // Port
// const PORT = process.env.PORT || 5000;

// // Start server **ONLY after DB connects**
// const startServer = async () => {
//   try {
//     console.log('Connecting to MongoDB...');
//     await connectDB();
//     console.log('MongoDB Connected!');

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();




import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health (قبل أي حاجة)
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);

// Port
const PORT = process.env.PORT || 0;

// Start server
const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB Connected!');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
};

startServer();
