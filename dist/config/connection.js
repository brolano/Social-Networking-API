import mongoose from 'mongoose';
mongoose.connect(process.env.MONGOURI || 'mongodb://127.0.0.1:27017/socialNetworkingDB');
export default mongoose.connection;
