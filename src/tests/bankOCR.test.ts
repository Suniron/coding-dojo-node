import {
  getNumberFromNumber3x3,
  getNumbers3x3FromLines3x27
} from "../katas/bankOCR";
import { numbers } from "../katas/bankOCR.types";

describe("BankOCR Tests...", () => {
  describe("getNumberFromNumber3x3():", () => {
    // Check goods args:
    for (let i = 0; i < 10; i++) {
      it("Should be " + i, () => {
        expect(getNumberFromNumber3x3(numbers[i].lines)).toBe(i);
      });
    }
    // Check bads args:
  });
  describe("getNumbers3x3FromLines3x27()", () => {
    //
  });
});
