const router = require("express").Router();

const contactsValidate = require("../validators/contacts");
const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContactById);

router.post(
  "/",
  contactsValidate.validateContactData,
  contactsController.createContact
);

router.put(
  "/:id",
  contactsValidate.validateContactData,
  contactsController.updateContact
);

router.delete("/:id", contactsController.deleteContact);

module.exports = router;
