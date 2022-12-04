import React, { useState } from "react";

//From API
import { useQuery } from "react-query";

function Animedata() {
  //State for next,prev Page
  const [page, setpage] = useState(1);

  //Fetching From API

  const fetchAnimeQoutes = async (page) => {
    const res = await fetch(
      "https://animechan.vercel.app/api/quotes?&page=" + page
    );
    return res.json();
  };

  const fetchAnimeData = async (page) => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=&page=` + page);
    return res.json();
  };

  const {
    isLoading,
    error,
    data: animeQoutes,
    isError,
    isFetching,
  } = useQuery(["quotes", page], () => fetchAnimeQoutes(page), {
    keepPreviousData: true,
  });

  const { data: anime } = useQuery(
    ["anime", page],
    () => fetchAnimeData(page),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading)
    return (
      <p className="font-bold text-center text-3xl mt-10 mb-10">Loading...</p>
    );

  if (isError)
    return (
      <p className="font-bold text-center text-3xl mt-10 mb-10">
        Error: {error.message}
      </p>
    );

  return (
    <>
      <div className="flex justify-center items-center flex-wrap">
        {anime.data.map((animeData) => (
          <div className="image">
            <img src={animeData.images.jpg.image_url} alt="" />
          </div>
        ))}

        {animeQoutes.map((animeQoutesData) => (
          <div className="content">
            <h3 className="text-3xl">{animeQoutesData.anime}</h3>
            <h2 className="text-2xl">{animeQoutesData.character}</h2>
            <p className="text-xl">{animeQoutesData.quote}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Animedata;
