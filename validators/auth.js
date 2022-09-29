import Joi from "joi";
import validatorHandler from "../middleware/validatorHandler.js";

export const signup = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().trim().alphanum().min(3).max(50).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      //.pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

export const signin = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      //.pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

// export default {
//   signup,
//   signin,
// };
