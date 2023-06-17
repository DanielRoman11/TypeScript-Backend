import mongoose from 'mongoose';
import IUser from '../interfaces/User.interface';
import bcrypt from 'bcrypt';

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true, trim: true},
  email: { type: String, required: true, trim: true, unique: true},
  password: { type: String, required: true  }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  const user = this;

  if(!user.isModified('password')) return next();

  //? generate salt
  bcrypt.genSalt( function(err, salt){
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export default userSchema;