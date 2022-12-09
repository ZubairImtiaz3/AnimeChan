import React, { useState } from "react";

//From API
import { useQuery } from "react-query";

function Animedata() {
  //State for next,prev Page
  const [page, setpage] = useState(1);

  const [search, setsearch] = useState("naruto");

  const [textsearch, setTextSearch] = useState("");

  //Fetching From API

  const fetchAnimeQoutes = async (page, search) => {
    const res = await fetch(
      `https://animechan.vercel.app/api/random/anime?title=${search}?&page=` +
        page
    );
    return res.json();
  };

  const fetchAnimeData = async (page, search) => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=1&page=` + page
    );
    return res.json();
  };

  const {
    isLoading,
    error,
    data: animeQoutes,
    isError,
  } = useQuery(["quotes", page, search], () => fetchAnimeQoutes(page, search), {
    keepPreviousData: true,
  });

  const { data } = useQuery(
    ["anime", page, search],
    () => fetchAnimeData(page, search),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading)
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <p className="font-bold text-center text-3xl mt-10 mb-10">
          Loading Qoutes...
        </p>
      </div>
    );

  if (isError)
    return (
      <p className="font-bold text-center text-3xl mt-10 mb-10">
        Error: {error.message}
      </p>
    );

  const handlerOnChange = (event) => {
    setTextSearch(event.target.value);
  };

  const handlerOnSearch = () => {
    setTextSearch(setsearch);
  };

  return (
    <>
      <h2 className="text-center pt-8 font-mont max-w-[90%] lg:max-w-[60%] m-auto text-sm md:leading-[2.3rem] md:text-[1.3rem]">
        Holla Weeb !! Here You Can Find Popular Qoutes Of Your Favourite Anime.
      </h2>

      <div>
        <div className="my-5 md:my-12 md:p-0 p-5 flex-wrap flex gap-4 justify-center">
          <input
            value={textsearch}
            onChange={handlerOnChange}
            className="border-black border-2 rounded-md placeholder-black w-[25rem] h-[3rem] pl-4"
            type="text"
            placeholder="Type Any Anime Title"
          />
          <button
            onClick={handlerOnSearch}
            className="border-black border-2 rounded-lg bg-black text-white w-[5.5rem] md:p-0 p-3"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex justify-around items-center flex-wrap">
        <div className="flex items-center my-10 p-5 md:p-0 flex-wrap self-start">
          {data.data.map((animeData) => (
            <div
              key={animeData.mal_id}
              className="rounded-lg shadow-lg bg-white max-w-sm flex flex-col"
            >
              <img
                className="rounded-t-lg"
                src={animeData.images.jpg.image_url}
                alt=""
              />
              <div className="p-[1rem]">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  Anime : <span>{animeQoutes.anime}</span>
                </h5>
                <p className="text-gray-700 text-base mb-4">
                  Character : <span>{animeQoutes.character}</span>
                </p>
                <p className="text-gray-700 text-base mb-4">
                  Qoute : <span>{animeQoutes.quote}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="nav flex justify-center items-center mb-20">
        <button
          onClick={() => setpage((prevState) => prevState + 1)}
          className=" cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-black hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 disabled:bg-indigo-400"
        >
          Load More
        </button>
      </div>
    </>
  );
}

export default Animedata;
