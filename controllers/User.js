import mongoose from 'mongoose';
import User from '../models/User';

class UserController {
  static create(request, response) {
    const { email, firstname, lastname, category} = request.body;
    const newUser = new User({
      firstname,
      lastname,
      email,
      category,
    })
    return newUser.save()
      .then((user) => {
        return response.status(201)
          .json({
            success: true,
            data: user
          });
      })
      .catch((err) => {
        return response.status(500)
          .json({
            success: false,
            message: err
          })
      });
  }

  static update(request, response) {
    const _id = request.params.userId;
    const { firstname } = request.body;
    if(request.body._id) {
      return response.status(400)
        .json({
          success: true,
          message: 'You cannot change a user\'s ID'
        });
    }
    User.update({ _id }, request.body).exec()
      .then((user) => {
        if(user) {
          return response.status(200)
            .json({
              success: true,
              data: user
            })
        } else {
          return response.status(400)
            .json({
              success: false,
              message: 'Nothing to Update'
            })
        }
      })
      .catch((err) => {
        return response.status(500)
          .json({
            success: false,
            message: err.message
          })
      })

  }

  static delete(request, response) {
    const _id = request.params.userId;
    return User.delete({ _id}).exec()
      .then((message) => {
        return response.status(200)
          .json({
            success: true,
            message: 'User Deleted'
          });
      })
      .catch((err) => {
        return response.status(500)
          .json({
            success: false,
            message: err.message
          })
      })
  }

  static getUsers(request, response) {
    return User.find({ }).exec()
      .then((users) => {
        if(users.length) {
          return response.status(200)
            .json({
              success: true,
              data: users
            })
        } else {
          return response.status(404)
            .json({
              success: false,
              message: 'No users in the database'
            })
        }
      })
  }

  static getUserByEmail(request, response) {
    const email = request.query.email;

    return User.findOne({ email }).exec()
      .then((user) => {
        if(user) {
          return response.status(200)
            .json({
              success: true,
              data: user
            })
        } else {
          return response.status(404)
            .json({
              success: false,
              message: 'No such user'
            })
        }
      })
      .catch((err) => {
        return response.status(500)
          .json({
            success: false,
            message: err.message
          })
      })
  }

  static getUsersByFirstName(request, response) {
    const firstname = request.query.firstname;
    return User.find({ firstname }).exec()
      .then((users) => {
        if(users) {
          return response.status(200)
            .json(users);
        } else {
          return response.status(404)
            .json({
              success: false,
              message: 'No such user'
            })
        }
      })
      .catch((err) => {
        return response.status(500)
          .json({
            success: false,
            message: err.message
          })
      })
  }

 }


export default UserController;
