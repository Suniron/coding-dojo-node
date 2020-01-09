import * as fs from "fs";
import {
  getNumberFromNumber3x3,
  getnumbers3x3FromLines3x27,
  getLines3x27ArrayFromString
} from "../katas/bankOCR";
import { numbers } from "../katas/bankOCR.types";

const contentUseCase1 = fs.readFileSync(
  "./src/katas/accountsUseCase1.txt",
  "utf8"
);

describe("BankOCR Tests...", () => {
  describe("getNumberFromNumber3x3():", () => {
    // Check with goods args:
    for (let i = 0; i < 10; i++) {
      test(`Number 3x3 (${i}) should be ${i}`, () => {
        expect(getNumberFromNumber3x3(numbers[i].lines)).toBe(i);
      });
    }

    // TODO:Check with bads args:
  });
  describe("getLines3x27ArrayFromString()", () => {
    test("Type of output[0] should be an array", () => {
      expect(typeof getLines3x27ArrayFromString(contentUseCase1)).toBe(
        typeof []
      );
      expect(typeof getLines3x27ArrayFromString(contentUseCase1)[0]).toBe(
        typeof []
      );
    });

    test("Type of output[0][O] should be string", () => {
      expect(typeof getLines3x27ArrayFromString(contentUseCase1)[0][0]).toBe(
        typeof ""
      );
    });
  });

  describe("getNumbers3x3FromLines3x27()", () => {
    const lines3x27Array = getLines3x27ArrayFromString(contentUseCase1);

    test("Output length of correct input should be 9", () => {
      expect(getnumbers3x3FromLines3x27(lines3x27Array[0]).length).toBe(9);
    });
    // Todo: continue here
    test("Output length of correct input should be 9", () => {
      expect(getnumbers3x3FromLines3x27(lines3x27Array[0])[0]).toBe(
        numbers[1].lines
      );
    });
  });
});
