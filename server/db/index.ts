import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || '');
        if(!conn){
            console.log('MongoDB Connection Failed');
            process.exit(1);
        }
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectDB;