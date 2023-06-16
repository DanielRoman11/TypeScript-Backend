import { Schema } from 'mongoose';
import IUser from '../interfaces/User.interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true},
  email: { type: String, required: true, trim: true, unique: true},
  password: { type: String, required: true  }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  const user = this;

  //? Only hash if it is new (or while modified)
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

userSchema.methods.comparePassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
}

export default userSchema;