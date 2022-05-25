import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URI!).then(() => {
  console.log('mongodb conneted');
});
