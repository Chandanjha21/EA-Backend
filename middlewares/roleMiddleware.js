// middleware/roleMiddleware.js

// This takes the role from the url like /add-user and check for permission using checkpermission method of config 
import { checkPermission } from '../config/roles';
import { ROLES } from '../config/roles';

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assume role is set on req.user after authentication

    if (checkPermission(userRole, requiredRole)) {
      return next(); // User has required permission, proceed
    } else {
      return res.status(403).json({ message: 'Access Denied: Insufficient permissions' });
    }
  };
};

module.exports = authorizeRole;
