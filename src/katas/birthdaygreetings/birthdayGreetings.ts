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

  sendBirthdayGreetings = (way: "email" | "sms") => {
    const message = {
      subject: "Happy birthday !",
      body: `Happy birthday, dear ${this.firstName}`,
    };

    way === "email"
      ? this.sendEmail(message.subject, message.body)
      : this.sendSMS(message.subject, message.body);
  };

  private sendEmail = (subject: string, body: string) => {
    // TODO: Get API to send Email
  };

  private sendSMS = (subject: string, body: string) => {
    // TODO: Get API to send SMS and contact number
  };
}

// -- FUNCTIONS --
export const getPersonsFromFileContent = (content: string) => {
  const persons: Array<Person> = [];

  // Delete the first line and browse all line to get != persons
  content
    .replace("last_name, first_name, date_of_birth, email\n", "")
    .split("\n")
    .forEach((line) => {
      const elements = line.replace(" ", "").split(",");
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

export const getBirthdayReminderNote = (
  senderFirstName: string,
  persons: Array<Person>
) => {
  if (persons.length === 0) return null;

  const message = {
    subject: "Birthday Reminder",
    header: `Dear ${senderFirstName},`,
    body: `Today is ${persons
      .map((person) => person.firstName + " " + person.lastName)
      .join(",")}'s birthday. Don't forget to send him message !`,
  };

  return message;
};

// -- MAIN --
if (require.main === module) {
  // Send file to database:
  fs.readFile(
    "./src/katas/birthdaygreetings/birthdayDates.txt",
    (err, data) => {
      if (err) {
        console.error("Can't open txt file:", err);
      } else {
        // Get persons objects:
        const persons = getPersonsFromFileContent(data.toString());
        // Try to store persons in database:
        persons.forEach((person) => database.insertPerson(person));
      }
    }
  );

  // Send birthdays greetings:
  database.getPersonsWhoIsBirthday(new Date(Date.now()), (persons) =>
    persons.forEach((person) => person.sendBirthdayGreetings("email"))
  );

  // Reminder note:
  database.getPersonsWhoIsBirthday(new Date("1994-04-15"), (persons) => {
    const reminderMsg = getBirthdayReminderNote("Etienne BLANC", persons);
    console.log(
      reminderMsg.subject + "\n\n",
      reminderMsg.header + "\n",
      reminderMsg.body
    );
  });
}
