import { numbers, Number3x3Lines } from "./bankOCR.types";

export const getNumberFromNumber3x3 = (numb: Number3x3Lines) => {
  for (let i = 0; i < numbers.length; i++) {
    if (JSON.stringify(numbers[i].lines) == JSON.stringify(numb)) {
      return numbers[i].value;
    } //
  }
};

export const getNumbers3x3FromLines3x27 = () => {};

export const getLines3x27ArrayFromString = (text: string) => {
  const lines = text.split("\n");
  const arrayOf3x27Lines = [];

  let tempArray = [];
  let count = 0;

  for (const i in lines) {
    if (count < 3) {
      tempArray.push(lines[i]);
      count++;
    } else {
      // lines[i] should be a blank line & multiple of 4
      arrayOf3x27Lines.push(tempArray);
      // Cleaning:
      tempArray = []; // Reinit tempArray
      count = 0; // Reinit count
    }
  }
  return arrayOf3x27Lines;
};
