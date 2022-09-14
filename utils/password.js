// @ts-nocheck
import bcrypt from "bcryptjs";

export const hash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const compare = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
