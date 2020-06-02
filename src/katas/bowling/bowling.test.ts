import { getFrames, getScore } from "./bowling";

const fullStrikes = "X X X X X X X X X X X X";
const full9andMiss = "9- 9- 9- 9- 9- 9- 9- 9- 9- 9-";
const full5andSparesAnd5forEnd = "5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5";

describe("getFrames()", () => {
  test(`${fullStrikes} should be 12 frames`, () => {
    expect(getFrames(fullStrikes)).toHaveLength(12);
  });
  test(`${full9andMiss} and ${full5andSparesAnd5forEnd} should be 10 frames`, () => {
    expect(getFrames(full9andMiss)).toHaveLength(10);
    expect(getFrames(full5andSparesAnd5forEnd)).toHaveLength(10);
  });
});

describe("getScore()", () => {
  test(`should ${fullStrikes} should have a score of 300`, () => {
    expect(getScore(getFrames(fullStrikes))).toBe(300);
  });
  test(`should ${full9andMiss} should have a score of 90`, () => {
    expect(getScore(getFrames(full9andMiss))).toBe(90);
  });
  test(`should ${full5andSparesAnd5forEnd} should have a score of 150`, () => {
    expect(getScore(getFrames(full5andSparesAnd5forEnd))).toBe(150);
  });
});
