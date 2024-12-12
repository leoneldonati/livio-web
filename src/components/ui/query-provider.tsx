import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const query = new QueryClient({});

  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
