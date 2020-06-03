export class Booking {
  clientID: string;
  date: {
    arrival: Date;
    departure: Date;
  };

  constructor(
    clientID: string,
    date: {
      arrival: Date;
      departure: Date;
    }
  ) {
    this.clientID = clientID;
    this.date = date;
  }
}
export class Room {
  name: string;
  bookings: Array<Booking> = [];
  constructor(name: string) {
    this.name = name;
  }

  isFree(arrival: Date, departure: Date) {
    const booked = this.bookings.find(
      (booking) =>
        (arrival > booking.date.arrival && arrival < booking.date.departure) ||
        (departure > booking.date.arrival && departure < booking.date.departure)
    );

    return booked ? false : true;
  }
}

export class Registry {
  rooms: Array<Room>;
  constructor(rooms: Array<Room>) {
    this.rooms = rooms;
  }

  write = () => {};
  read = (filters?: {
    date?: { arrival: Date; departure: Date };
    roomName?: string;
  }) => {
    if (!filters) {
      return this.rooms;
    }

    if (filters.roomName) {
      const findedRoom = this.rooms.find(
        (room) => room.name === filters.roomName
      );
      return findedRoom;
    }

    if (filters.date) {
      const freeRooms = this.rooms.filter((room) =>
        room.isFree(filters.date.arrival, filters.date.departure)
      );
      return freeRooms;
    }
  };

  bookARoom = (
    clientId: string,
    roomName: string,
    arrivalDate: Date,
    departureDate: Date
  ) => {};
}

export class Hotel {
  name: string;
  registry: Registry;
  constructor(name: string, registry: Registry) {
    this.name = name;
    this.registry = registry;
  }
}

/*
// == USER STORY ==
if (require.main === module) {
  const rooms = [
    new Room("Red room"),
    new Room("French room"),
    new Room("NSFW room"),
  ];
  const hotel = new Hotel("Suniron Hotel", rooms);
  console.log(`** WELCOME TO ${hotel.name.toLocaleUpperCase()} **`);
  console.log(" ==== STORY 1 ====");
  console.log("User: Hey, i want to see all free rooms.");
  console.log("Suniron: No problem, look this screen:");
  console.log(
    hotel
      .getFreeRooms()
      .map((room) => room)
      .join("\n")
  );
  console.log(" ==== STORY 2 ====");
  console.log("TODO...");
}
*/
