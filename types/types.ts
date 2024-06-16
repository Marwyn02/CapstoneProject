export interface Guest {
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
  created_at: string;
  room_id: string;
  payment_term: string;
  children_age: number[];
  payment_status: string;
  balance_remaining: number;
}
[];
