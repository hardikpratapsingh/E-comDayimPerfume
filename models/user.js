// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     // role: { type: String, default: "customer" },
//     // createdAt: { type: Date, default: Date.now }
// },{ timestamps: true });

// module.exports = mongoose.model("User", UserSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    createdAt:{type:Date,default:Date.now},
})

export const User = mongoose.model("User",userSchema)