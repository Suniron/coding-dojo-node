import * as database from "./birthdayGreetings.db";
import * as fs from "fs";

export class Person {
  firstName: string = null;
  lastName: string = null;
  dateOfBirth: Date = null;
  email: string = null;
  constructor(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    email: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
  }

  sendBirthdayGreetings = () => {
    // TODO
  };
}

// -- FUNCTIONS --
export const getPersonsFromFileContent = (content: string) => {
  const persons: Array<Person> = [];

  // Delete the first line and browse all line to get != persons
  content
    .replace("last_name, first_name, date_of_birth, email\n", "")
    .split("\n")
    .forEach(line => {
      const elements = line.split(",");
      if (elements.length === 4) {
        persons.push(
          new Person(
            elements[0],
            elements[1],
            new Date(elements[2]),
            elements[3]
          )
        );
      } else {
        return;
      }
    });

  return persons;
};

const storePersons = async (persons: Array<Person>) => {
  persons.forEach(person => database.insertPerson(person));
};

// getPersonsFromDb

// -- MAIN --
if (require.main === module) {
  fs.readFile(
    "./src/katas/birthdaygreetings-kata/birthdayDates.txt",
    (err, data) => {
      if (err) {
        console.error("Can't open txt file:", err);
      } else {
        // Get persons objects:
        const persons = getPersonsFromFileContent(data.toString());
        // Try to store persons in database:
        persons.forEach(person => database.insertPerson(person));
        // Get all persons from database:
        const gettedPersons = database.getPersons();
        console.log("->", gettedPersons);
      }
    }
  );
}
