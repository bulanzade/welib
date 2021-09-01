const {Schema, model} = require('mongoose')

const bookSchema = new Schema({
        name:
        {
            type: String,
            required: [true, 'bookName field is required']
        },
        author:
        {
            type: String,
            required: [true, 'author field is required']
        },
        desc:
        {
            type: String,
            required: [true, 'desc field is required']
        },
        img:
        {
            type: String,
            required: [true, 'img field is required']
        },
        count:
        {
            type: Number,
            required: [true, 'count filed is required']
        },
        available:
        {
            type: Number,
            required: [true, 'available filed is required']
        }
    }, {timestamps: true}
)

module.exports = model('books', bookSchema)