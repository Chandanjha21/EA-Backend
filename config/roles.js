// config/roles.js
// this page is to store all the roles and their respective actions these actions will be hitted via routes
// like when some adds a user /add-user hits and then we will use that and then checks that current user role have that permission

// some thing like thsi 
// Allow users with add-user permission to add new users
// router.post('/add-user', authorize('add-user'), addUser);

const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ORGANIZATION_ADMIN: 'organization_admin',
    MANAGER: 'manager',
    ACCOUNTANT: 'accountant',
    EMPLOYEE: 'employee'
  };
  
  const PERMISSIONS = { // question is these have a meaning for database, yes then what else I will need to create
    [ROLES.SUPER_ADMIN]: ['manage_all', 'view_reports', 'manage_users', 'manage_organizations'],
    [ROLES.ORGANIZATION_ADMIN]: ['view_reports', 'manage_users', 'add-user', 'manage_products', 'manage_orders'],
    [ROLES.MANAGER]: ['view_reports', 'manage_users', "add-user" , 'manage_products', 'manage_orders'],
    [ROLES.ACCOUNTANT]: ['view_reports', 'manage_orders'],
    [ROLES.EMPLOYEE]: ['view_products', 'create_orders'],
  };
  
  const checkPermission = (role, action) => {
    return PERMISSIONS[role] ? PERMISSIONS[role].includes(action) : false;
  };
  
  module.exports = { ROLES, PERMISSIONS, checkPermission };
  