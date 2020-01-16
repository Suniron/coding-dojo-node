import { insertPersonIntoDbIfNotExist } from "./birthdayGreetings.db";

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

const putPersonsIntoDb = (persons: Array<Person>) => {};

// getPersonsFromDb

// -- MAIN --
if (require.main === module) {
  const etienne = new Person(
    "Etienne",
    "Blanc",
    new Date("1994/04/15"),
    "etienne.blanc94@gmail.com"
  );

  insertPersonIntoDbIfNotExist(etienne);
}
