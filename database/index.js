const mongoose = require("mongoose")

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(`Unable to connect data base: ${error.message}`);
    }
}