const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
});

userSchema.methods.generateToken = async function () {
    const user = this;

    const payload = {
        user: {
            id: user.id
        }
    }

    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });
        return token;
    } catch (e) {
        console.log(e.message)
    }
    
    return null;
}

userSchema.methods.comparePassword = async function(password) {
    const user = this;

    return await bcrypt.compare(password, user.password);
}

module.exports = mongoose.model('user', userSchema);