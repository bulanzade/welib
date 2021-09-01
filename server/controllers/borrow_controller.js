const Borrow = require('../models/borrow_schema')
const User = require('../models/user_schema')
const Book = require('../models/book_schema')

const borrowBook = (req, res) =>
{
    Book.findById(req.body.book._id)
    .then(book =>
    {
        if (book.available > 0)
        {
            book.available--;
            Book.findByIdAndUpdate(book._id, book)
            .then(data =>
            {
                req.body.borrowDate = new Date()
                Borrow.create(req.body)
                .then(borrow =>
                {
                    return res.status(201).json(borrow)
                })
                .catch(err =>
                {
                    console.error(err)
                    return res.status(500).json(err)
                })
            })
            .catch(err =>
            {
                console.error(err)
                return res.status(500).json(err)
            })
        }
        else
        {
            return res.status(500).json({'msg': '该书已被借完'});
        }
    })
    .catch(err =>
    {
        console.error(err)
        return res.status(500).json(err)
    })
}

const returnBook = (req, res) =>
{
    req.body.returnDate = new Date()
    Borrow.findById(req.body._id)
    .then(data1 =>
    {
        if (data1.returnDate)
        {
            return res.status(200).json({'msg':'已归还此书'})
        }
        else
        {
            Borrow.findByIdAndUpdate(req.body._id, req.body)
            .then(data2 =>
            {
                Book.findById(req.body.book._id).then(data3 =>
                {
                    data3.available++;
                    Book.findByIdAndUpdate(data3._id, data3).then(data3 =>
                    {
                        return res.status(200).json(req.body)
                    })
                })
            })
        }
    })
    .catch(err =>
    {
        console.error(err)
        return  res.status(500).json(err)
    })
}

const readUserBorrow = (req, res) =>
{
    Borrow.find({'user._id':req.params.id})
    .then(data =>
    {
        return res.status(200).json(data)
    })
    .catch(err =>
    {
        console.error(err)
        return res.status(500).json(err)
    })
}

module.exports =
{
    borrowBook,
    returnBook,
    readUserBorrow
}