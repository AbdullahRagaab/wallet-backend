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

app.set('trust proxy', 1);

// CORS CONFIG
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENTURL || 'https://abdullah-wallet.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  credentials: true, 
  optionsSuccessStatus: 200,
};

app.options('*', cors(corsOptions));

// Apply CORS middleware
app.use(cors(corsOptions));


app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes('Origin not allowed')) {
    return res.status(403).json({ error: 'CORS error: origin not allowed' });
  }
  next(err);
});

const PORT = process.env.PORT || 5000;

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
