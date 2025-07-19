const router = require("express").Router();
const Util = require("../utilities/utilities");

const personalInfoValidate = require("../validators/personalInfo");
const personalInfoController = require("../controllers/personalInfo");

router.get(
  "/",
  /* #swagger.tags = ['personal_info']
     #swagger.description = 'Get all personal info'
  */
  Util.handleErrors(personalInfoController.getAllPersonalInfo)
);

router.get(
  "/:id",
  /* #swagger.tags = ['personal_info']
     #swagger.description = 'Get a personal info entry by ID'
  */
  Util.handleErrors(personalInfoController.getPersonalInfoById)
);

router.post(
  "/",
  /* #swagger.tags = ['personal_info']
     #swagger.description = 'Create a new personal info entry'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'personal info data',
       required: true,
       schema: { $ref: '#/definitions/personalInfoInput' }
     }
     #swagger.responses[201] = {
       description: 'personal info created successfully',
       schema: { $ref: '#/definitions/personalInfo' }
     }
  */
  ...personalInfoValidate.personalInfoValidationRules,
  personalInfoValidate.validatePersonalInfoData,
  Util.handleErrors(personalInfoController.createPersonalInfo)
);

router.put(
  "/:id",
  /* #swagger.tags = ['personal_info']
     #swagger.description = 'Update an existing personal info entry by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the personal info to update',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated personal info data',
       required: true,
       schema: { $ref: '#/definitions/personalInfoInput' }
     }
  */
  ...personalInfoValidate.personalInfoValidationRules,
  personalInfoValidate.validatePersonalInfoData,
  Util.handleErrors(personalInfoController.updatePersonalInfo)
);

router.delete(
  "/:id",
  /* #swagger.tags = ['personal_info']
     #swagger.description = 'Delete a personal info entry by ID'
  */
  Util.handleErrors(personalInfoController.deletePersonalInfo)
);

module.exports = router;
