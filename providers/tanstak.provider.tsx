"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const queryClient = new QueryClient();

interface TanstackProviderProps {
  children: React.ReactNode;
}

export const TanstackProvider: React.FC<TanstackProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
