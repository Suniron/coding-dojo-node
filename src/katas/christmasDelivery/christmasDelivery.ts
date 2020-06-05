export class Present {}

export class ToyMachine {
  presentStock: Array<Present> = [];
  makePresent = () => {
    this.presentStock.push(new Present());
  };
  givePresent = () => {
    const presentToDeliver = this.presentStock.slice(0, 1);
    return presentToDeliver;
  };
}

export class Elf {}

export class SantaSleigh {
  presents: Array<Present> = [];
  putPresentOnBoard = (present: Present) => {
    this.presents.push(present);
  };
}

// == MAIN ==
if (require.main === module) {
}
