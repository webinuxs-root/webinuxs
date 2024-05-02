"use client"
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const makeQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000
            }
        }
    })
}

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
    if (typeof window === "undefined") {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

const TenstackProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}

export default TenstackProvider;