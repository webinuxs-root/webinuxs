import { ReactNode } from "react";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";

//Interface
interface Props {
    client: QueryClient;
    children: ReactNode;
}

const TenstackWrapper = ({ client, children }: Props) => {
    return (
        <HydrationBoundary state={dehydrate(client)}>
            {children}
        </HydrationBoundary>
    );
};

export default TenstackWrapper;