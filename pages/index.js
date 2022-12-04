import React from "react";

// Components
import Animedata from "../components/AnimeData";

//Fecting Data Using ReactQuery
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "react-query/devtools";

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Animedata />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
