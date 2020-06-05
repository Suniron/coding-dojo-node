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
        (arrival >= booking.date.arrival &&
          arrival <= booking.date.departure) ||
        (departure >= booking.date.arrival &&
          departure <= booking.date.departure)
    );

    return booked ? false : true;
  }
}

export class Registry {
  rooms: Array<Room>;
  constructor(rooms: Array<Room>) {
    this.rooms = rooms;
  }

  write = (
    clientId: string,
    roomName: string,
    date: { arrival: Date; departure: Date }
  ) => {
    const roomIndex = this.rooms.findIndex((room) => room.name === roomName);

    // If no room with roomName
    if (roomIndex === -1) {
      return;
    }

    this.rooms[roomIndex].bookings.push(new Booking(clientId, date));
  };

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

    return [];
  };
}

export class Hotel {
  name: string;
  registry: Registry;
  constructor(name: string, registry: Registry) {
    this.name = name;
    this.registry = registry;
  }

  bookARoom = (
    clientId: string,
    roomName: string,
    date: { arrival: Date; departure: Date }
  ): boolean => {
    const room = this.registry.rooms.find((room) => room.name === roomName);

    // If room does not exist or is busy:
    if (!room || !room.isFree(date.arrival, date.departure)) {
      return false;
    }

    this.registry.write(clientId, roomName, date);

    return true;
  };
}

// == USER STORIES ==
if (require.main === module) {
  // == PREPARE ==
  const rooms = [
    new Room("Red room"),
    new Room("French room"),
    new Room("NSFW room"),
  ];
  const registry = new Registry(rooms);
  const hotel = new Hotel("Suniron Hotel", registry);
  // Add some bookings:
  hotel.registry.rooms[0].bookings = [
    new Booking("mrWhite", {
      arrival: new Date("2020-12-12T14:00:00"),
      departure: new Date("2020-12-13T10:00:00"),
    }),
    new Booking("#mrBlanc", {
      arrival: new Date("2020-12-14T14:00:00"),
      departure: new Date("2020-12-16T10:00:00"),
    }),
  ];

  // == STORY 1 ==
  console.log("\n******************************");
  console.log(`** WELCOME TO ${hotel.name.toLocaleUpperCase()} **`);
  console.log("******************************");
  console.log("\n==== STORY 1 ====");
  console.log("User: Hey, i want to see all free rooms!");
  console.log(
    "Receptionist: Ok, we got these:",
    (hotel.registry.read({
      date: {
        arrival: new Date("2020-12-12T15:00:00"),
        departure: new Date("2020-12-13T10:00:00"),
      },
    }) as Array<Room>)
      .map((freeRoom) => freeRoom.name)
      .join(", ") + "."
  );

  // == STORY 2 ==
  console.log("\n==== STORY 2 ====");
  console.log("User: I want to book French Room tonight, is it possible?");
  console.log(
    "Receptionist: Well, i'm booking that for you ;-). Please, wait..."
  );
  // Book the room:
  hotel.bookARoom("Mr BLANC", "French Room", {
    arrival: new Date(Date.now()),
    departure: new Date(Date.now() + 1),
  });
  console.log("Receptionist: ... OK! I give you the keys <8-)");
}
