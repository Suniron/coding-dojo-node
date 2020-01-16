import * as sq from "sqlite3";
import { Person } from "./birthdayGreetings";

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

export const insertPerson = (person: Person) => {
  //yyyy-mm-yy: person.dateOfBirth.toISOString().split("T")[0]
  const cmdSQL =
    "INSERT INTO persons(first_name, last_name, birthday, email)" +
    `VALUES ("${person.firstName}", "${
      person.lastName
    }", "${person.dateOfBirth.toDateString()}","${person.email}")`;
  /*+` SELECT ${person.firstName}, ${person.lastName}, "${person.dateOfBirth}", "${person.email}"` +
    `WHERE NOT EXISTS(SELECT 1 FROM persons WHERE first_name = ${person.firstName} AND last_name = ${person.lastName})`;*/

  db.run(cmdSQL, err => {
    if (err) {
      //console.error("Error:", err);
    } else {
      console.log(person.firstName, person.lastName, "was added to bdd.");
    }
  });
};

export const getPersons = () => {
  const result: any = [];

  db.all("SELECT * FROM persons", [], (err, rows) => {
    if (err) {
      throw err;
    }
    result.push(rows);
  });

  return result;
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
