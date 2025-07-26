const router = require("express").Router();
const Util = require("../utilities/utilities");

const loginsValidate = require("../validators/logins");
const loginsController = require("../controllers/logins");

const isAuthenticated = require("../authentication/authenticate");

router.get(
  "/",
  /* #swagger.tags = ['logins']
     #swagger.description = 'Get all logins'
  */
  isAuthenticated,
  Util.handleErrors(loginsController.getAllLogins)
);

router.get(
  "/:id",
  /* #swagger.tags = ['logins']
     #swagger.description = 'Get a login by ID'
  */
  isAuthenticated,
  Util.handleErrors(loginsController.getLoginById)
);

router.post(
  "/",
  /* #swagger.tags = ['logins']
     #swagger.description = 'Create a new login'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'login data',
       required: true,
       schema: { $ref: '#/definitions/loginInput' }
     }
     #swagger.responses[201] = {
       description: 'login created successfully',
       schema: { $ref: '#/definitions/login' }
     }
  */
  isAuthenticated,
  ...loginsValidate.loginValidationRules,
  loginsValidate.validateLoginData,
  Util.handleErrors(loginsController.createLogin)
);

router.put(
  "/:id",
  /* #swagger.tags = ['logins']
     #swagger.description = 'Update an existing login by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the login to update',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated login data',
       required: true,
       schema: { $ref: '#/definitions/loginInput' }
     }
  */
  isAuthenticated,
  ...loginsValidate.loginValidationRules,
  loginsValidate.validateLoginData,
  Util.handleErrors(loginsController.updateLogin)
);

router.delete(
  "/:id",
  /* #swagger.tags = ['logins']
     #swagger.description = 'Delete a login by ID'
  */
  isAuthenticated,
  Util.handleErrors(loginsController.deleteLogin)
);

module.exports = router;
