import { ToyMachine, SantaSleigh, Present } from "./christmasDelivery";

const toyMachine = new ToyMachine();
const santaSleigh = new SantaSleigh();

describe("ToyMachine object...", () => {
  describe("makePresent() method:", () => {
    // Reinit present stock:
    toyMachine.presentStock = [];
    // Make present in stock:
    toyMachine.makePresent();
    // Check:
    test("should presentStock have a length of 1 after make", () => {
      expect(toyMachine.presentStock).toHaveLength(1);
    });
    describe("givePresent() method:", () => {
      toyMachine.makePresent();
      const stockBefore = toyMachine.presentStock.length;
      // Do method:
      toyMachine.givePresent();
      // Check:
      test("should presentStock have a length of 1 after make", () => {
        expect(toyMachine.presentStock).toHaveLength(stockBefore - 1);
      });
    });
  });
});

describe("SantaSleigh object...", () => {
  describe("putPresentOnBoard() method:", () => {
    test("should output a Present object", () => {
      // Reinit presents on sleigh:
      santaSleigh.presents = [];
      // Put a present on board:
      santaSleigh.putPresentOnBoard(new Present());
      // Check:
      expect(santaSleigh.presents).toHaveLength(1);
    });
  });
});
