/**
 * @description asyncHandler is a function used to wrap async routes
 * @param {function} fn the function or the controller which will be used for route
 * @return {*} result of executed function
 */
export const asyncHandler = (fn) => async (request, response, next) => {
  try {
    return await fn(request, response, next);
  } catch (error) {
    return next(error);
  }
};
