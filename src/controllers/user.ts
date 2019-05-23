import { User } from "./../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getJWTSecret } from "./../util";

export const handleUserLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  try {
    if (!user) {
      throw "Invalid username";
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw "Invalid password";
    }
    const token = jwt.sign(user.toJSON(), getJWTSecret(), {
      algorithm: "HS256"
    });
    res.json({ token });
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
};

export const handleUserSignup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = new User(username, password);
    const r = await user.save();
    res.json({ msg: "Created", user: r.toJSON() });
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
};

export const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  jwt.verify(token, getJWTSecret(), (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
      next(err);
      return;
    }
    next();
    return;
  });
};
