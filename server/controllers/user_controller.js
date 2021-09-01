'use strict';

const User = require('../models/user_schema');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
  if (req.session.user)
  {
    return;
  }
  let account = req.body.account;
  let password = req.body.password;
  User.findOne({'account': account})
  .then(data => {
    if (data)
    {
      if (bcrypt.compareSync(password, data.password))
      {
        req.session.user = data;
        res.status(200).json({'state': 'SUCCESS', 'user': data});
      }
      else
      {
        res.status(200).json({'state': 'FAILED', 'msg': '密码错误'});
      }
    }
    else
    {
      res.status(200).json({'state': 'FAILED', 'msg': '账号不存在'});
    }
  })
  .catch(err => {
    console.error(err)
    res.status(500).json(err)
  });
};

const logout = (req, res) =>
{
  if (req.session.user)
  {
    req.session.destroy(err =>
    {
      console.error(err)
    })
    return res.status(200).json({'msg':'登出成功'})
  }
  else
  {
    return res.status(200).json({'msg':'该用户未登录'});
  }
}

const createUser = (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  User.create(req.body)
    .then((data) => {
      console.log('New User Created!', data);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const readAllUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log('User updated!');
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const deleteUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error('User not available');
      }
      return data.remove();
    })
    .then((data) => {
      console.log('User removed!');
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  login,
  logout,
  createUser,
  readAllUsers,
  updateUser,
  deleteUser,
};
