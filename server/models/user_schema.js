const { Schema, model } = require('mongoose');

const userSchema = new Schema({
        account:
        {
            type: Number,
            unique: true,
            required: [true, 'account is required']
        },
        name:
        {
            type: String,
            required: [true, 'name field is required']
        },
        password:
        {
            type: String,
            required: [true, 'password field is required']
        }
    }, { timestamps: true }
);

module.exports = model('users', userSchema);
