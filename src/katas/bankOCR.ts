import { numbers, Number3x3Lines } from "./bankOCR.types";

export const getNumberFromNumber3x3 = (numb: Number3x3Lines) => {
  for (let i = 0; i < numbers.length; i++) {
    if (JSON.stringify(numbers[i].lines) == JSON.stringify(numb)) {
      return numbers[i].value;
    } //
  }
};

export const getLines3x27ArrayFromString = (text: string) => {
  const lines = text.split("\n");
  const arrayOf3x27Lines: Array<Array<string>> = [];

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

export const getnumbers3x3FromLines3x27 = (lines3x27: Array<string>) => {
  const numbers3x3: Array<Number3x3Lines> = [];

  let lines: Array<Array<string>> = [];

  let tempLine: Array<string> = [];
  let tempString = "";

  // GET EACH 3 CHAR:
  // Each lines:
  for (let line in lines3x27) {
    let count = 0;
    // Each char:
    for (let i = 0; i < lines3x27[line].length; i++) {
      if (count < 3) {
        tempString = tempString + lines3x27[line][i];
        count++;
      }
      // If blank between numbers
      if (count === 3) {
        tempLine.push(tempString);

        // Reinit tempString and count:
        tempString = "";
        count = 0;
      }
    }

    // Save and reinit:
    lines.push(tempLine);
    tempLine = [];
  }

  // GROUP EACH NUMBER:
  for (let i = 0; i < lines[0].length; i++) {
    let tempNumber3x3: Number3x3Lines = { 0: "", 1: "", 2: "" }; //[]

    // Todo: find a best way
    tempNumber3x3[0] = lines[0][i];
    tempNumber3x3[1] = lines[1][i];
    tempNumber3x3[2] = lines[2][i];
    //tempNumber3x3.push(lines[line][i]);

    numbers3x3.push(tempNumber3x3);
  }
  console.log(numbers3x3);
  return numbers3x3;
};
