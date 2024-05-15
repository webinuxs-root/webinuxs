"use client"
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

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
                <ProgressBar
                    height="4px"
                    color="#FA4F00"
                    options={{ showSpinner: false }}
                    delay={300}
                />
                {children}
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}

export default TenstackProvider;