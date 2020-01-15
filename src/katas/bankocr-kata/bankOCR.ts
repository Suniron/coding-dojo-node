import * as fs from "fs";
import {
  numbers,
  Number3x3Lines,
  BankAccount,
  Number3x3
} from "./bankOCR.types";

// TODO: Add type to != elements
// TODO2: Use map where as possible

/**
 *
 * @param numb number3x3 like {0: "   ", 1: "  |", 2: "  |"} for 1.
 *
 * This function return the value of number3x3 gived or null
 */
export const getNumberFromNumber3x3 = (numb: Number3x3Lines) => {
  for (let i = 0; i < numbers.length; i++) {
    if (JSON.stringify(numbers[i].lines) == JSON.stringify(numb)) {
      return numbers[i].value.toString();
    } //
  }
  return "?";
};

export const getLines3x27ArrayFromString = (text: string) => {
  // TODO: Use map
  const lines = text.split("\n");
  const arrayOf3x27Lines: Array<Array<string>> = [];

  let tempArray = [];
  let count = 0;

  for (const i in lines) {
    if (count < 3) {
      tempArray.push(lines[i].replace("\r", ""));
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

export const getNumbers3x3InsideAccountLine3x27 = (
  lines3x27: Array<string>
) => {
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
export const isValidChecksum: (account: string) => boolean = account => {
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

export const getCheckedAccount: (
  accountNumber: string
) => BankAccount = accountNumber => {
  // Store bank account:
  const bankAccount: BankAccount = {
    number: accountNumber.toString(),
    isValid: false
  };

  // Get validity:
  bankAccount.isValid =
    bankAccount.number.length === 9
      ? isValidChecksum(bankAccount.number)
      : false;

  // Get reason
  if (!bankAccount.isValid) {
    bankAccount.number.includes("?")
      ? (bankAccount.reason = "ILL")
      : (bankAccount.reason = "ERR");
  }

  return bankAccount;
};

export const getAccountsFromString = (fileContent: string) => {
  const accounts: Array<string> = getLines3x27ArrayFromString(fileContent).map(
    lines3x27 =>
      getNumbers3x3InsideAccountLine3x27(lines3x27)
        .map(number3x3 => {
          return getNumberFromNumber3x3(number3x3);
        })
        .join("")
  );

  return accounts;
};

export const getSimilarNumbers = (numb: Number3x3Lines) => {
  const similarNumbers3x3: Array<Number3x3> = [];

  const lines = [numb[0], numb[1], numb[2]];

  for (let lineNb = 0; lineNb <= 2; lineNb++) {
    for (let charNb = 0; charNb <= 2; charNb++) {
      let tempNumber = lines;
      const currentChar = tempNumber[lineNb][charNb];

      if (currentChar === "_") {
        tempNumber[lineNb][charNb] = "|"; // TODO: Continue here
      }
    }
  }

  // Each line of number:
  for (const [key, line] of Object.entries(numb)) {
    // Each char of line
    for (const char of line) {
      const tempNumber = numb;

      // Change on char of tempNumber
      // Check number with this change (tempNumber)
      // Add if it's a number
      // Try again with other char (pipe or underscore)
    }
  }

  return similarNumbers3x3;
};

// -- MAIN --
// Todo: can launch from same folder (path)
// Todo2: replace reading method by async way
// Todo3: use map with Array
if (require.main === module) {
  // USE CASE n°1:
  console.log("\nUse case 1:");
  // 1. get the file
  const fileUseCase1 = fs.readFileSync(
    "./src/katas/bankocr-kata/accountsUseCase1.txt",
    "utf8"
  );

  // 2. parse the file
  const linesUseCase1 = getLines3x27ArrayFromString(fileUseCase1);
  const accountsUseCase1 = [];

  for (let line in linesUseCase1) {
    const numbers = getNumbers3x3InsideAccountLine3x27(
      linesUseCase1[line]
    ).map(number3x3 => getNumberFromNumber3x3(number3x3));
    accountsUseCase1.push(numbers.join(""));
  }

  // 3. show account numbers
  console.log(accountsUseCase1.map(account => account).join(",\n"));

  // USE CASE n°3:
  console.log("\nUse case 3:");
  // 1. get the file
  const fileUseCase3 = fs.readFileSync(
    "./src/katas/bankocr-kata/accountsUseCase3.txt",
    "utf8"
  );

  // 2. parse the file
  const accountsUseCase3 = getAccountsFromString(fileUseCase3)
    .map(accountNumber => {
      const account = getCheckedAccount(accountNumber);
      return `${account.number} ${!account.isValid ? account.reason : ""}`;
    })
    .join("\n");

  // 3. put in a new file
  fs.writeFile(
    "./src/katas/bankocr-kata/accountsUseCase3-output.txt",
    accountsUseCase3,
    () => console.log("The file accountsUseCase3-output.txt was created.")
  );
  // TODO: Continue here
  // USE CASE n°4:
}
