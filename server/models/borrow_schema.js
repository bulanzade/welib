const {Schema, model, ObjectId} = require('mongoose')

const borrowSchema = new Schema({
    borrowDate:
    {
        type: Date,
        default: new Date(),
        required: true
    },
    returnDate:
    {
        type: Date
    },
    user:
    {
        type:
        {
          _id: ObjectId,
          name: String
        },
        required: true
    },
    book:
    {
        type:
        {
          _id: ObjectId,
          name: String
        },
        required: true
    }
})

module.exports = model('borrow', borrowSchema)