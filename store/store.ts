import { create } from "zustand";

interface AppState {
  date: {
    from: any;
    to: any;
  };
  dayStay: number | undefined;
  room: string;
  adult: string;
  children: string;
  childrenAge: string[];
}

interface AppActions {
  setDate: (from: any, to: any) => void;
  setDayStay: (dayStay: number | undefined) => void;
  setRoom: (room: string) => void;
  setAdult: (adult: string) => void;
  setChildren: (children: string) => void;
  setChildrenAge: (childrenAge: string[]) => void;
}

const useStore = create<AppState & AppActions>((set) => ({
  date: {
    from: "",
    to: "",
  },
  dayStay: 0,
  room: "",
  adult: "",
  children: "",
  childrenAge: [],

  setDate: (from, to) => set((state) => ({ date: { from, to } })),
  setDayStay: (dayStay) => set((state) => ({ dayStay })),
  setRoom: (room) => set((state) => ({ room })),
  setAdult: (adult) => set((state) => ({ adult })),
  setChildren: (children) => set((state) => ({ children })),
  setChildrenAge: (childrenAge) => set((state) => ({ childrenAge })),
}));

export default useStore;