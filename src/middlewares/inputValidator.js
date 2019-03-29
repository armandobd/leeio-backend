const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  validateInput: schema => {
    return (req, res, next) => {
      console.log(req.body);
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
    })
  }
};
