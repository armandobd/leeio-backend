module.exports = function asyncMiddleware(asyncHandler) {
  return async (req, res, next) => {
    try {
      await asyncHandler(req, res);
    } catch (error) {
      next(error);
    }
  };
};
