import { error } from "node:console";
import { promises as fsPromises } from "node:fs";
import path from "node:path";
import { nanoid } from "nanoid";

const fs = fsPromises;

const currentDir = path.dirname(new URL(import.meta.url).pathname);
const contactsPath = path.join(currentDir, "contacts.json");

export async function listContacts() {
  await fs
    .readFile(contactsPath)
    .then((contacts) => {
      return JSON.parse(contacts);
    })
    .catch((err) => {
      error(err);
    });
}

export async function getContactById(contactId) {
  await fs
    .readFile(contactsPath)
    .then((contacts) => {
      const contactsArray = JSON.parse(contacts);
      const contactToFind = contactsArray.find(
        (contact) => contact.id === contactId
      );
      if (contactToFind) {
        return contactToFind;
      } else {
        return null;
      }
    })
    .catch((err) => {
      error(err);
    });
}

export async function removeContact(contactId) {
  await fs
    .readFile(contactsPath)
    .then((contacts) => {
      const contactsArray = JSON.parse(contacts);
      const contactToRemove = contactsArray.find(
        (contact) => contact.id === contactId
      );
      if (contactToRemove) {
        const newContacts = contactsArray.filter(
          (contact) => contact.id !== contactId
        );
        fs.writeFile(contactsPath, JSON.stringify(newContacts));
        return contactToRemove;
      } else {
        return null;
      }
    })
    .catch((err) => {
      error(err);
    });
}

export async function addContact(name, email, phone) {
  await fs
    .readFile(contactsPath)
    .then((contacts) => {
      const contactsArray = JSON.parse(contacts);
      const contactToAdd = {
        name,
        email,
        phone,
        id: nanoid(),
      };
      if (contactToAdd) {
        contactsArray.push(contactToAdd);
        return contactToAdd;
      } else {
        return null;
      }
    })
    .catch((err) => {
      error(err);
    });
}
