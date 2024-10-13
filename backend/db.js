const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://farhanalimirza19:lA5XLb1GJa0ZwCoK@cluster0.cs5xmon.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        min: 0
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
	User, Account
};