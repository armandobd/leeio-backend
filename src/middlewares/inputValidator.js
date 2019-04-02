const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  validateInput: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error.details[0].message);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },
  schemas: {
    bookSchema: Joi.object().keys({
      title: Joi.string()
        .trim()
        .min(1)
        .max(30)
        .required(),
      summary: Joi.string()
        .min(10)
        .max(300)
        .required(),
      genre: Joi.array().items(Joi.objectId().required())
    }),
    genreSchema: Joi.object().keys({
      name: Joi.string()
        .trim()
        .min(3)
        .max(20)
        .required()
    }),
    userSchema: Joi.object().keys({
      name: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required(),
      email: Joi.string()
        .trim()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .trim()
        .min(5)
        .max(1024)
        .required()
        // TO DO: check regex returned to user
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/
        )
    })
  }
};
