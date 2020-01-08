import * as fs from "fs";
import {
  getNumberFromNumber3x3,
  getNumbers3x3FromLines3x27,
  getLines3x27ArrayFromString
} from "../katas/bankOCR";
import { numbers } from "../katas/bankOCR.types";

const contentUseCase1 = fs.readFileSync(
  "./src/katas/accountsUseCase1.txt",
  "utf8"
);

describe("BankOCR Tests...", () => {
  describe("getNumberFromNumber3x3():", () => {
    // Check goods args:
    for (let i = 0; i < 10; i++) {
      it("Should be " + i, () => {
        expect(getNumberFromNumber3x3(numbers[i].lines)).toBe(i);
      });
    }

    // TODO:Check bads args:
  });
  describe("getLines3x27ArrayFromString()", () => {
    it("Should be an array", () => {
      expect(typeof getLines3x27ArrayFromString(contentUseCase1)).toBe(
        typeof []
      );
      expect(typeof getLines3x27ArrayFromString(contentUseCase1)[0]).toBe(
        typeof []
      );
    });

    it("Should be a string", () => {
      expect(typeof getLines3x27ArrayFromString(contentUseCase1)[0][0]).toBe(
        typeof ""
      );
    });

    //describe("getNumbers3x3FromLines3x27()", () => {
    //const lines = contents.split("\n");
    //});
  });
});
