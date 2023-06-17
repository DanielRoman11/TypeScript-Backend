import 'dotenv/config';
import { Request, Response } from 'express';
import User from '../models/User';
import { createJWT } from '../libs/jwt';
import bcrypt from 'bcrypt';
import { stat } from 'fs';

export const createUser = async(req: Request, res: Response) =>{
  const { username, email, password } = req.body;
  try {

    const userFind = await User.findOne({email: email})
    if(userFind) return res.status(400).json({msg: "This email is already used"});

    const newUser = new User({
      username,
      email,
      password
    });

    const user = await newUser.save();
    const token: unknown = await createJWT({id: user._id})

    res.cookie('_token', token);
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }  
}

export const login = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    
    const userFound = await User.findOne({email});

    if(!userFound) return res.status(400).json({message: 'Invalid credentials'});
    
    const isMatch = await bcrypt.compare(password, userFound.password);

    if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

    const token = await createJWT({id: userFound._id});

    res.cookie('_token', token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}

export const logout = async(req: Request, res: Response) => {
  
}