import * as sq from "sqlite3";

// Enable debug messages:
sq.verbose();

// Get database:
const db = new sq.Database("./src/katas/birthdayGreetings.db3");

class person {
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
// getPersonsFromFile
// putPersonsToDb
// getPersonsFromDb

// -- MAIN --
