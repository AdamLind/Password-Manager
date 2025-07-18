const router = require("express").Router();
const Util = require("../utilities/utilities");

const contactsValidate = require("../validators/contacts");
const contactsController = require("../controllers/contacts");

router.get("/", Util.handleErrors(contactsController.getAllContacts));
router.get("/:id", Util.handleErrors(contactsController.getContactById));

router.post(
  "/",
  contactsValidate.contactValidationRules,
  contactsValidate.validateContactData,
  Util.handleErrors(contactsController.createContact)
);

router.put(
  "/:id",
  contactsValidate.validateContactData,
  Util.handleErrors(contactsController.updateContact)
);

router.delete("/:id", Util.handleErrors(contactsController.deleteContact));

module.exports = router;
