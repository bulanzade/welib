const express = require('express')

const {
  createUser,
  readAllUsers,
  updateUser,
  deleteUser,
  login,
  logout
} = require('../controllers/user_controller')

const
{
  createBook,
  readAllBooks,
  readBookByName
} = require("../controllers/book_controller")

const
{
  borrowBook,
  returnBook,
  readUserBorrow
} = require('../controllers/borrow_controller')

const router = express.Router()

router
  .post('/login', login)
  .post('/logout', logout)
  .post('/user', createUser)
  .get('/user', readAllUsers)
  .put('/user/:id', updateUser)
  .delete('/user/:id', deleteUser)

router.get("/book", readAllBooks)
  .post("/book", createBook)
  .get("/book/:name", readBookByName)

router.post('/borrow', borrowBook)
  .put('/borrow', returnBook)
  .get('/borrow/:id', readUserBorrow)

module.exports = router
