import { create } from "zustand";

interface AppState {
  place: string;
  date: {
    from: any;
    to: any;
  };
  dayStay: number | undefined;
  room: string;
  roomPrice: number;
  adult: string;
  children: string;
  childrenAge: string[];
}

interface AppActions {
  setPlace: (place: string) => void;
  setDate: (from: any, to: any) => void;
  setDayStay: (dayStay: number | undefined) => void;
  setRoom: (room: string) => void;
  setRoomPrice: (roomPrice: number) => void;
  setAdult: (adult: string) => void;
  setChildren: (children: string) => void;
  setChildrenAge: (childrenAge: string[]) => void;
}

const useStore = create<AppState & AppActions>((set) => ({
  place: "",
  date: {
    from: "",
    to: "",
  },
  dayStay: 0,
  room: "",
  roomPrice: 0,
  adult: "2 Adults",
  children: "",
  childrenAge: [],

  setPlace: (place) => set((state) => ({ place })),
  setDate: (from, to) => set((state) => ({ date: { from, to } })),
  setDayStay: (dayStay) => set((state) => ({ dayStay })),
  setRoom: (room) => set((state) => ({ room })),
  setRoomPrice: (roomPrice) => set((state) => ({ roomPrice })),
  setAdult: (adult) => set((state) => ({ adult })),
  setChildren: (children) => set((state) => ({ children })),
  setChildrenAge: (childrenAge) => set((state) => ({ childrenAge })),
}));

export default useStore;
