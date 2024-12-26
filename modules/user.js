const { string } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;




const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
});




const User = new Schema({});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
