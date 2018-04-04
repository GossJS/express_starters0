const mongoose = require('mongoose');

mongoose.Promise = Promise;
const conn = mongoose.createConnection('mongodb://aprilstudent:Qwerty.123@151.248.115.32/aprilstudents');
const UserSchema = new mongoose.Schema({
  login: {
    type: 'String',
  },
  password: {
    type: 'String',
  },
}, { collection: 'studentrecords' });

UserSchema.pre('save', n => console.log('saved') || n());
module.exports = conn.model(null, UserSchema);
