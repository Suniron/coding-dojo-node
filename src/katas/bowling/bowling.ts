interface Strike {
  type: "strike";
  value: "X";
}

interface Spare {
  type: "spare";
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

interface Simple {
  type: "simple";
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}
type Frame = Strike | Spare | Simple;
type Line = Array<Frame>; // 10 or more if full strike (12 max)

export const getScore = (frames: Array<Frame>) => {
  // == FULL STRIKES ==
  if (!frames.find((f) => f.type !== "strike")) {
    return 300; // Max score
  }

  // == OTHER CASES ==
  let scoreToBoost = 0; // Boost with strike and spare
  let totalScore = 0;

  for (const [index, frame] of frames.entries()) {
    // add a scoreToAdd to boost with spare/strike
    switch (true) {
      case frame.type === "strike":
        break;
      case frame.type === "spare":
        break;
      default:
        // = "simple"
        console.log("getScore =>", frame);
        totalScore += frame.value as number;
        break;
    }

    if (index === frames.length - 1) {
      // No spare calc here (last frame)
    }
  }

  return totalScore;
};

/**
 *
 * @param framesInSring frames results in one string
 *
 * Return an array of frames
 */
export const getFrames = (framesInSring: string): Line => {
  const frames: Array<Frame> = framesInSring.split(" ").map((frame) => {
    // -- strike --:
    if (frame === "X") {
      return { type: "strike", value: "X" } as Strike;
    }
    // Extract tries:
    const tries = frame.split("").map((value, index) => {
      if (value === "-") {
        return 0;
      }
      return value;
    });

    // -- spare or 2 numbers --:
    if (tries[1] === "/") {
      return { type: "spare", value: Number(tries[0]) } as Spare;
    } else {
      console.log(tries);

      return {
        type: "simple",
        value: Number(tries[0]) + Number(tries[1]),
      } as Simple;
    }
  });

  return frames;
};
