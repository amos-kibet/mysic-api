import bcrypt from "bcryptjs";

export const hash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const compare = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

// export default {
//   hash,
//   compare,
// };
