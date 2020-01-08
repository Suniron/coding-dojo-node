import { numbers, Number3x3Lines } from "./bankOCR.types";

export const getNumberFromNumber3x3 = (numb: Number3x3Lines) => {
  for (let i = 0; i < numbers.length; i++) {
    if (JSON.stringify(numbers[i].lines) == JSON.stringify(numb)) {
      return numbers[i].value;
    } //
  }
};

export const getNumbers3x3FromLines3x27 = () => {};
