export interface Number3x3Lines {
  0: string;
  1: string;
  2: string;
}
export interface Number3x3 {
  lines: Number3x3Lines;
  value: number;
}

export interface Numbers3x3 {
  "0": Number3x3;
  "1": Number3x3;
  "2": Number3x3;
  "3": Number3x3;
  "4": Number3x3;
  "5": Number3x3;
  "6": Number3x3;
  "7": Number3x3;
  "8": Number3x3;
  "9": Number3x3;
}
type failReasons = "ILL" | "ERR";

export interface BankAccount {
  number: string; // Need a string to escape 0 leading errors like 000000051
  isValid: boolean;
  reason?: failReasons;
}

export const numbers = [
  {
    lines: {
      0: " _ ",
      1: "| |",
      2: "|_|"
    },
    value: 0
  },
  {
    lines: {
      0: "   ",
      1: "  |",
      2: "  |"
    },
    value: 1
  },
  {
    lines: {
      0: " _ ",
      1: " _|",
      2: "|_ "
    },
    value: 2
  },
  {
    lines: {
      0: " _ ",
      1: " _|",
      2: " _|"
    },
    value: 3
  },
  {
    lines: {
      0: "   ",
      1: "|_|",
      2: "  |"
    },
    value: 4
  },
  {
    lines: {
      0: " _ ",
      1: "|_ ",
      2: " _|"
    },
    value: 5
  },
  {
    lines: {
      0: " _ ",
      1: "|_ ",
      2: "|_|"
    },
    value: 6
  },
  {
    lines: {
      0: " _ ",
      1: "  |",
      2: "  |"
    },
    value: 7
  },
  {
    lines: {
      0: " _ ",
      1: "|_|",
      2: "|_|"
    },
    value: 8
  },
  {
    lines: {
      0: " _ ",
      1: "|_|",
      2: " _|"
    },
    value: 9
  }
];
