"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IUsers {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
}

export interface UserState {
  users: IUsers[];
  addUser: (user: IUsers) => void;
  updateUser: (id: string, updatedUser: Partial<IUsers>) => void;
  removeUser: (id: string) => void;
  clearUsers: () => void;
  getUserById: (id: string) => IUsers | undefined;
  totalUsers: () => number;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      updateUser: (id, updatedUser) =>
        set((state) => {
          const updatedUsers = state.users.map((user) =>
            user._id === id ? { ...user, ...updatedUser } : user
          );
          return { users: updatedUsers };
        }),

      removeUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user._id !== id),
        })),

      clearUsers: () => set({ users: [] }),

      getUserById: (id) => get().users.find((user) => user._id === id),

      totalUsers: () => get().users.length,
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
