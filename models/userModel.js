const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true },
    email: { type: String, required: true, maxLength: 100, index: { unique: true } },
    address: { type: String, required: true, maxLength: 100 },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
})

module.exports = mongoose.model('Users', userSchema)