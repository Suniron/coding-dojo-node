import * as sq from "sqlite3";
import { Person } from "./birthdayGreetings";
import { PersonInDB } from "./birthdayGreetings.types";

// Enable debug messages:
sq.verbose();

// Get database:
const db = new sq.Database(
  "./src/katas/birthdaygreetings-kata/birthdayGreetings.db3"
);

const initDbTable = (
  database: sq.Database = db,
  tableName: string,
  columns: Array<Array<string>>
) => {
  let columnsConfig = "";

  // Get requestConfig

  columns.forEach((column, index) => {
    column.forEach(element => (columnsConfig += " " + element));

    if (index < columns.length - 1) columnsConfig += ",";
  });

  // Make the request
  const cmdSQL =
    "CREATE TABLE IF NOT EXISTS " + tableName + " (" + columnsConfig + ");";

  // Do the request:
  database.run(cmdSQL, err => {
    if (err) console.error("Erreur on init table:", err);
  });
};

const convertPersonFromDbToClass = (person: PersonInDB) => {
  return new Person(
    person.first_name,
    person.last_name,
    new Date(person.birthday),
    person.email
  );
};

export const insertPerson = (person: Person) => {
  //yyyy-mm-yy: person.dateOfBirth.toISOString().split("T")[0]
  const cmdSQL =
    "INSERT INTO persons(first_name, last_name, birthday, email)" +
    'VALUES ("' +
    person.firstName +
    '","' +
    person.lastName +
    '","' +
    person.dateOfBirth.toDateString() +
    '","' +
    person.email +
    '")';

  db.run(cmdSQL, err => {
    if (err) {
      //console.error("Error:", err);
    } else {
      console.log(person.firstName, person.lastName, "was added to bdd.");
    }
  });
};

export const getPersons = (callback: (persons: Array<Person>) => void) => {
  db.all("SELECT * FROM persons", [], (err, rows: Array<PersonInDB>) => {
    if (err) {
      throw err;
    }
    const persons = rows.map(person => convertPersonFromDbToClass(person));
    callback(persons);
  });
};

/**
 *
 * @param birthday - Birthdate in Date() format
 * @param callback - Function which is run after get data
 *
 * TODO: Get with just month and day
 */
export const getPersonsWhoIsBirthday = (
  birthday: Date,
  callback: (persons: Array<Person>) => void
) => {
  db.all(
    `SELECT * FROM persons WHERE birthday = "${birthday.toDateString()}"`,
    (err, rows: Array<PersonInDB>) => {
      const persons = rows.map(person => convertPersonFromDbToClass(person));
      callback(persons);
    }
  );
};

// Launch this file to init database and table if not exist.
if (require.main === module) {
  initDbTable(db, "persons", [
    ["first_name", "TEXT NOT NULL"],
    ["last_name", "TEXT NOT NULL"],
    ["birthday", "DATE NOT NULL"], // TODO: Convert to date
    ["email", "TEXT NOT NULL UNIQUE"]
  ]);
}
