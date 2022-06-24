import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name: { type: String, required:true, match: /[a-z]/, trim: true},
    email: { type: String, required:true, match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, trim: true, unique: true},
    password: { type: String , required:true , trim: true },
    join: { type: Date, default: Date.now }
})


const User = mongoose.model('user', userSchema);

export default User;