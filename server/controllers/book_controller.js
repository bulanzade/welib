const Book = require('../models/book_schema')

const createBook = (req, res) =>
{
    Book.create(req.body)
    .then((data) =>
    {
        res.status(201).json(data)
    })
    .catch((err) =>
    {
        if (err.name === 'ValidationError')
        {
            console.error('Error Validating', err)
            res.status(422).json(err)
        }
        else
        {
            console.error(err)
            res.status(500).json(err)
        }
    })
}

const readAllBooks = (req, res) =>
{
    Book.find()
    .then((data) =>
    {
        res.status(200).json(data)
    })
    .catch((err) =>
    {
        console.error(err)
        res.status(500).json(err)
    })
}

const readBookByName = (req, res) =>
{
    Book.find({$or:
        [
            {'name': new RegExp(req.params.name)},
            {'author': new RegExp(req.params.name)},
            {'desc': new RegExp(req.params.name)}
        ]
    })
    .then((data) =>
    {
        res.status(200).json(data)
    })
    .catch((err) =>
    {
        console.error(err)
        res.status(500).json(err)
    })
}

module.exports =
{
    createBook,
    readAllBooks,
    readBookByName
}