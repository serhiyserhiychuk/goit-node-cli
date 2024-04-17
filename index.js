import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

function invokeAction(actionType, ...args) {
  switch (actionType) {
    case "list":
      console.table(listContacts());
      break;
    case "get":
      console.log(getContactById(args));
      break;
    case "remove":
      console.log(removeContact(args));
      break;
    case "add":
      console.log(addContact(args));
      break;
    default:
      console.log("Unknown action type!");
      break;
  }
}
