export interface Guest {
  filter: any;
  length: number;
  map(
    arg0: (guest: Guest, i: number) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  created_at: string;
  user_id: string;
}
[];

export interface Reservation {
  length: number;
  map(
    arg0: (reservation: Reservation, i: number) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  adult: string;
  children: string;
  payment: string;
  guests: {
    map(
      arg0: (guest: any, i: number) => import("react").JSX.Element
    ): import("react").ReactNode;
    adults: number;
    children: number;
    price: number;
    room: string;
  };
  services: {
    laundry: {
      choice: string;
      price: number;
      request: string;
    };
    transport: {
      choice: string;
      from: string;
      price: number;
      trip: string;
    };
  };
  created_at: string;
  room_id: string;
  payment_term: string;
  children_age: number[];
  payment_status: string;
  balance_remaining: number;
}
[];

export type Room = {
  id: string;
  name: string;
  image: string;
  amenities: { amenities: string[] };
  no_available: number;
  price: number;
  no_adult: number;
  no_children: number;
  no_person: number;
  created_at: string;
}[];
