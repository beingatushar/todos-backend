import mongoose from "mongoose";

const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log(`Database connected to ${mongoose.connection.host}`);

    }).catch((err) => {
        console.log(err);

    });
}
export default connect;
