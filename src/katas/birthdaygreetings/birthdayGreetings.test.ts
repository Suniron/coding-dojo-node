import { Person, getPersonsFromFileContent } from "./birthdayGreetings";
import * as fs from "fs";

const contentBirthdaysFile = fs.readFileSync(
  "./src/katas/birthdaygreetings/birthdayDates.txt",
  "utf8"
);

const etienne = new Person(
  "Etienne",
  "Blanc",
  new Date("1994/04/15"),
  "etienne.blanc94@gmail.com"
);

describe("Birthday Greetings Tests:", () => {
  const obtainedPersons = getPersonsFromFileContent(contentBirthdaysFile);

  describe("getPersonsFromFileContent", () => {
    // test("Output length should be 3", () => {
    //   expect(obtainedPersons.length).toBe(3);
    // });
    test("Output length of bad content should be 0", () => {
      expect(getPersonsFromFileContent("fez21f6547zef153z3fze").length).toBe(0);
    });
  });
});
