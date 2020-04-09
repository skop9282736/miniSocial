const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// encrypt password
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// get avatar
UserSchema.pre("save", async function (next) {
    const avatar = gravatar.url(this.email, {
        s: '200', // size
        r: 'pg', // Rating
        d: 'mm' //default
    });
    this.avatar = avatar;
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    const payload = {
        id: this._id,
        name: this.name,
        email: this.email,
        avatar: this.avatar
    }
    return "Bearer " + jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRE}
    );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User = mongoose.model("users", UserSchema)