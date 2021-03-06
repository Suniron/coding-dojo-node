import { Hotel, Room, Registry, Booking } from "./cqrsBooking";

// Make hotel with registry & rooms:
const rooms = [
  new Room("Red room"),
  new Room("French room"),
  new Room("NSFW room"),
];
const registry = new Registry(rooms);
const hotel = new Hotel("Testing Hotel", registry);

// Add some bookings:
hotel.registry.rooms[0].bookings = [
  new Booking("#ClientOne", {
    arrival: new Date("2020-12-12T14:00:00"),
    departure: new Date("2020-12-13T10:00:00"),
  }),
  new Booking("#ClientTwo", {
    arrival: new Date("2020-12-14T14:00:00"),
    departure: new Date("2020-12-16T10:00:00"),
  }),
];

describe("Room object...", () => {
  describe("isFree() method:", () => {
    test("should on empty slot is thruty", () => {
      expect(
        hotel.registry.rooms[0].isFree(
          new Date("2020-12-17T14:00:00"),
          new Date("2020-12-18T10:00:00")
        )
      ).toBeTruthy();
    });
    test("should on busy slot for arrival (but not for departure) is falsy", () => {
      expect(
        hotel.registry.rooms[0].isFree(
          new Date("2020-12-13T09:00:00"),
          new Date("2020-12-14T10:00:00")
        )
      ).toBeFalsy();
    });
    test("should on busy slot for departure (but not for arrival) is falsy", () => {
      expect(
        hotel.registry.rooms[0].isFree(
          new Date("2020-12-13T14:00:00"),
          new Date("2020-12-14T15:00:00")
        )
      ).toBeFalsy();
    });
    test("should on busy slot for departure and arrival is falsy", () => {
      expect(
        hotel.registry.rooms[0].isFree(
          new Date("2020-12-13T09:00:00"),
          new Date("2020-12-14T15:00:00")
        )
      ).toBeFalsy();
    });
  });
});

describe("Registry object...", () => {
  describe("read() method:", () => {
    describe("whithout filters", () => {
      test(`should have a length of ${rooms.length}`, () => {
        expect(hotel.registry.read()).toHaveLength(rooms.length);
      });
    });

    describe("whith filters", () => {
      test(`Name "undefined room": should have a length of 0`, () => {
        expect(
          hotel.registry.read({ roomName: "undefined name" })
        ).toBeUndefined();
      });
      test(`Name "${rooms[1].name}": should match with Room object`, () => {
        expect(hotel.registry.read({ roomName: "French room" })).toBe(rooms[1]);
      });
      test(`Date: should give 2x free rooms`, () => {
        expect(
          (hotel.registry.read({
            date: {
              arrival: new Date("2020-12-12T15:00:00"),
              departure: new Date("2020-12-13T19:00:00"),
            },
          }) as Array<Room>).length
        ).toBe(2);
      });
    });
  });
  describe("write() method:", () => {
    const bookingsCountBefore = hotel.registry.rooms[0].bookings.length;
    test(`should bookings length should be +1 after write`, () => {
      // Write:
      hotel.registry.write("clientTest", rooms[0].name, {
        arrival: new Date("2020-12-15T15:00:00"),
        departure: new Date("2020-12-16T10:00:00"),
      });
      // Test:
      expect(hotel.registry.rooms[0].bookings.length).toBe(
        bookingsCountBefore + 1
      );
    });
    test(`should bookings length should be +1 again after write`, () => {
      const bookingsCountBefore = hotel.registry.rooms[0].bookings.length;
      // Write:
      hotel.registry.write("clientTest", rooms[0].name, {
        arrival: new Date("2020-12-16T15:00:00"),
        departure: new Date("2020-12-17T10:00:00"),
      });
      // Test:
      expect(hotel.registry.rooms[0].bookings.length).toBe(
        bookingsCountBefore + 1
      );
    });
  });
});

describe("Hotel object ...", () => {
  describe("bookARoom() method:", () => {
    const bookingsCountBefore = hotel.registry.rooms[1].bookings.length;

    test("should booking success be truthy", () => {
      expect(
        hotel.bookARoom("clientTest", rooms[1].name, {
          arrival: new Date("2020-12-17T15:00:00"),
          departure: new Date("2020-12-18T10:00:00"),
        })
      ).toBeTruthy();
    });

    test("should bookings increase of 1", () => {
      expect(hotel.registry.rooms[1].bookings.length).toBe(
        bookingsCountBefore + 1
      );
    });

    test("should booking failed be falsy (date already booked)", () => {
      expect(
        hotel.bookARoom("clientTest", rooms[1].name, {
          arrival: new Date("2020-12-17T15:00:00"),
          departure: new Date("2020-12-18T10:00:00"),
        })
      ).toBeFalsy();
    });
  });
});
