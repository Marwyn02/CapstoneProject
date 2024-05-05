import { create } from "zustand";

interface AppState {
  place: string;
  date: {
    from: any;
    to: any;
  };
  nightStay: number | undefined;
  room: string;
  roomPrice: number;
  adult: number;
  children: number;
  childrenAge: string[];
  total: number;
}

interface AppActions {
  setPlace: (place: string) => void;
  setDate: (from: any, to: any) => void;
  setNightStay: (nightStay: number | undefined) => void;
  setRoom: (room: string) => void;
  setRoomPrice: (roomPrice: number) => void;
  setAdult: (adult: number) => void;
  setChildren: (children: number) => void;
  setChildrenAge: (childrenAge: string[]) => void;
  setTotal: (total: number) => void;
}

const useStore = create<AppState & AppActions>((set) => ({
  place: "",
  date: {
    from: "",
    to: "",
  },
  nightStay: 0,
  room: "",
  roomPrice: 0,
  adult: 2,
  children: 0,
  childrenAge: [],
  total: 0,

  setPlace: (place) => set((state) => ({ place })),
  setDate: (from, to) => set((state) => ({ date: { from, to } })),
  setNightStay: (nightStay) => set((state) => ({ nightStay })),
  setRoom: (room) => set((state) => ({ room })),
  setRoomPrice: (roomPrice) => set((state) => ({ roomPrice })),
  setAdult: (adult) => set((state) => ({ adult })),
  setChildren: (children) => set((state) => ({ children })),
  setChildrenAge: (childrenAge) => set((state) => ({ childrenAge })),
  setTotal: (total) => set((state) => ({ total })),
}));

export default useStore;
