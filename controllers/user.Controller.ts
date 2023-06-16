import 'dotenv/config';
import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';
import { createJWT } from '../libs/jwt';

export const createUser = async(req: Request, res: Response) =>{
  const { name, email, password } = req.body;
  try {

    const userFind = await User.findOne({email: email})
    if(userFind) return res.status(400).json({msg: "This email is already used"});

    const newUser = new User({
      name,
      email,
      password
    });

    const user = await newUser.save();
    const token: unknown = await createJWT({id: user._id})

    res.cookie('_token', token);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }  
}

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = User.findOne({email: email});

  if(!user) return res.status(400).json({error: "User not found"});

  // if(user.comparePassword(password))
}

