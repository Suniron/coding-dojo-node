import * as fs from "fs";
import { numbers, Number3x3Lines } from "./bankOCR.types";

/**
 *
 * @param numb number3x3 like {0: "   ", 1: "  |", 2: "  |"} for 1.
 *
 * This function return the value of number3x3 gived or null
 */
export const getNumberFromNumber3x3 = (numb: Number3x3Lines) => {
  for (let i = 0; i < numbers.length; i++) {
    if (JSON.stringify(numbers[i].lines) == JSON.stringify(numb)) {
      return numbers[i].value;
    } //
  }
  return null;
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

    // Todo: find a best way like a for...in
    tempNumber3x3[0] = lines[0][i];
    tempNumber3x3[1] = lines[1][i];
    tempNumber3x3[2] = lines[2][i];

    numbers3x3.push(tempNumber3x3);
  }

  return numbers3x3;
};

/**
 *
 * @param account 9 digits which will be checked
 *
 * Return true or false (default) depending checksum result
 */
export const isValidChecksum: (account: number) => boolean = account => {
  let checksum = 0;
  let multiplicator = 1;

  for (let i = account.toString().length; i > 0; i--) {
    checksum += Number(account.toString()[i - 1]) * multiplicator;
    multiplicator++;
  }

  if (checksum % 11 === 0) {
    return true;
  } else {
    return false;
  }
};

// -- MAIN --
if (require.main === module) {
  // USE CASE n°1:
  // 1. get the file
  const fileUseCase1 = fs.readFileSync(
    "./src/katas/bankocr-kata/accountsUseCase1.txt",
    "utf8"
  );

  // 2. parse the file
  const linesUseCase1 = getLines3x27ArrayFromString(fileUseCase1);
  const accountsUseCase1 = [];

  for (let line in linesUseCase1) {
    const numbers = getnumbers3x3FromLines3x27(
      linesUseCase1[line]
    ).map(number3x3 => getNumberFromNumber3x3(number3x3));
    accountsUseCase1.push(numbers.join(""));
  }

  // 3. show account numbers
  console.log(
    "Account numbers for use case 1:\n" +
      accountsUseCase1.map(account => account).join(",\n")
  );

  // USE CASE n°2:
  // USE CASE n°3:
  // USE CASE n°4:
}
