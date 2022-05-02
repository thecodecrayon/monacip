const { roles } = require('../config/roles');

exports.grantAccess = function(action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if(!permission.granted) {
        return res.status(401).json({
          error: `You don't have permission to perform this action!`
        });
      }
      next();
    } catch(err) {
      next(err);
    }
  }
}