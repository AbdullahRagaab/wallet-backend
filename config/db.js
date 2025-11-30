// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       dbName: process.env.MONGO_DB || 'wallet_db',
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Mongo connection error', error);
//     process.exit(1);
//   }
// };

// export default connectDB;




// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       dbName: process.env.MONGO_DB || 'wallet_db',
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,

//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Mongo connection error', error);
//     process.exit(1);
//   }
// };

// export default connectDB;


// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       dbName: process.env.MONGO_DB || 'wallet_db',
//       serverSelectionTimeoutMS: 5000,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Mongo connection error', error);
//     process.exit(1);
//   }
// };

// export default connectDB;



import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB || 'wallet_db',
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 30000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;

  } catch (error) {
    console.error('Mongo connection error:', error.message);
    // ممنوع تعمل process.exit في Railway
    throw error; 
  }
};

export default connectDB;
