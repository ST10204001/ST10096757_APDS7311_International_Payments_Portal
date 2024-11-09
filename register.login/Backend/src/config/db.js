import mongoose from 'mongoose';

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://monajackson98:Kc9gZY2EAkj5mIs9@cluster0.uxhruuc.mongodb.net/test', { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit if DB connection fails
    }
};

export default connectDB;
