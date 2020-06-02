interface Strike {
  type: "strike";
}

interface Spare {
  type: "spare";
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

interface Simple {
  type: "simple";
  values: Array<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>;
}
type Frame = Strike | Spare | Simple;
type Line = Array<Frame>; // 10 or more if full strike (12 max)

export const getScore = (frames: Array<Frame>) => {
  // == FULL STRIKES ==
  if (!frames.find((f) => f.type !== "strike")) {
    return 300; // Max score
  }

  // == OTHER CASES ==
  let spareBonus = false;
  let strikeBonus = false;
  let totalScore = 0;

  for (const [index, frame] of frames.entries()) {
    // If up to 10 turn:
    if (index < 10) {
      // Apply strike and spare bonus:
      if (spareBonus || strikeBonus) {
        if (frame.type === "simple") {
          totalScore += frame.values[0];
          if (strikeBonus) {
            totalScore += frame.values[1];
          }
        } else if (frame.type === "strike") {
          totalScore += 10;
        } else if (frame.type === "spare") {
          totalScore += frame.value;
        }
        // remove bonus
        spareBonus = false;
        strikeBonus = false;
      }
    }

    // Check score and bonus:
    switch (true) {
      case frame.type === "strike":
        totalScore += 10;
        // Enable strike bonus:
        strikeBonus = true;
        break;

      case frame.type === "spare":
        totalScore += 10;
        // Enable spare bonus:
        spareBonus = true;
        break;

      case frame.type === "simple":
      default:
        (frame as Simple).values.forEach((value) => {
          totalScore += value;
        });
        break;
    }
  }

  return totalScore;
};

/**
 *
 * @param framesSring frames results in one string
 *
 * Return an array of frames
 */
export const getFrames = (framesSring: string): Line => {
  const frames: Array<Frame> = [];

  framesSring.split(" ").forEach((frame) => {
    // -- strike --
    if (frame === "X") {
      return frames.push({ type: "strike" } as Strike);
    }
    // Extract tries:
    let tries = frame.split("").map((value, index) => {
      if (value === "-") {
        return 0;
      }
      return value;
    });

    // -- spare  --
    if (tries[tries.length - 1] === "/") {
      return frames.push({ type: "spare", value: Number(tries[0]) } as Spare);
    }

    // -- simple --
    if (tries.length === 2) {
      return frames.push({
        type: "simple",
        values:
          tries.length === 2
            ? [Number(tries[0]), Number(tries[1])]
            : [Number(tries[0]), Number(tries[2])],
      } as Simple);
    } else {
      frames.push({
        type: "spare",
        value: Number(tries[0]),
      } as Spare);
      frames.push({
        type: "simple",
        values: [Number(tries[0])],
      } as Simple);
    }
  });

  return frames;
};

export const doGame = (framesString: string): number => {
  const frames = getFrames(framesString);
  const score = getScore(frames);

  return score;
};

// == MAIN ==
if (require.main === module) {
  console.log("It's a good night for bowling... :-)");
  console.log(
    `Jim, you scored ${doGame("3- X 36 8/ 23 X X 12 3/ 71")} points !`
  );
}
