import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const User = new Schema({
  firstname: {
    type: String,
    min: 2,
    required: [true, 'Provide a firstname']
  },

  lastname: {
    type: String,
    min: 2,
    required: [true, 'Provide a Lastname']
  },

  email: {
    type: String,
    require: [true, 'Provide an email'],
    unique: true,
  },
  category: {
    type: String,
    enum: ['single', 'married', 'divorced']
  }
});

User.path('email').validate((value) => {
  const validEmailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
  return validEmailPattern.test(value);
}, 'Invalid email address')


export default mongoose.model('User', User);
