import 'dotenv/config';
import { Request, Response } from 'express';
import User from '../models/User';
import { createJWT } from '../libs/jwt';
import bcrypt from 'bcrypt';

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

export const login = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userFound = User.findOne({email});
  
    if(!userFound) return res.status(400).json({error: "User not found"});
  
    res.status(200).json(userFound)
    
  } catch (error) {
    res.status(400).json({error})  
  }
}

