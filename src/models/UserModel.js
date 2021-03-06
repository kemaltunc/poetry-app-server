const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const baseSchema = require('./BaseModel')

const userSchema = baseSchema.schema(baseSchema.create, {
    name: {
        type: String,
        required: [true, 'Please fill your name']
    },
    surname: {
        type: String,
        required: [true, 'Please fill your surname']
    },
    email: {
        type: String,
        required: [true, 'Please fill your email']
    },
    password: {
        type: String,
        required: [true, 'Please fill your password'],
        minLength: 6,
        select: false
    },
    favorite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12);
    next()
})

userSchema.methods.correctPassword = async function (typedPassword, originalPassword) {
    return await bcrypt.compare(typedPassword, originalPassword);
}

const User = mongoose.model('User', userSchema)
module.exports = User