const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    careerPath: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) { 
        const salt = await bcrypt.genSalt(10); // Generate salt for hashing


        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
