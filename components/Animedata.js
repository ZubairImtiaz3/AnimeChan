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

  const { data } = useQuery(["anime", page], () => fetchAnimeData(page), {
    keepPreviousData: true,
  });

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
      {/* <div className="flex justify-center items-center flex-wrap">
        {data.data.map((animeData) => (
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
      </div> */}

      <div className="bg-black h-[4.5rem]">
        <h1 className="text-white text-center pt-5 text-lg font-mont">
          Anime Qoutes
        </h1>
      </div>
      <h2 className="text-center pt-8 font-mont max-w-[90%] lg:max-w-[60%] m-auto text-sm md:leading-[2.3rem] md:text-[1.3rem]">
        Holla Weeb !! Here You Can Find Popular Qoutes Of Your Favourite Anime
        Character.
      </h2>
      <div>
        <form
          action=""
          className="my-5 md:my-12 md:p-0 p-5 flex-wrap flex gap-4 justify-center"
        >
          <input
            className="border-black border-2 rounded-md placeholder-black w-[25rem] h-[3rem] pl-4"
            type="text"
            placeholder="Type Any Character  "
          />
          <button className="border-black border-2 rounded-lg bg-black text-white w-[5.5rem] md:p-0 p-3">
            Search
          </button>
        </form>
      </div>
      <div className="flex justify-around items-center flex-wrap">
        {animeQoutes.map((animeQoutesData) => (
          <div className="flex items-center my-10 p-5 md:p-0 flex-wrap self-start">
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
              <img
                className="rounded-t-lg"
                src="https://wallpaperaccess.com/full/395983.jpg"
                alt=""
              />

              <div className="p-[1rem]">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  Character : <span>{animeQoutesData.character}</span>
                </h5>
                <p className="text-gray-700 text-base mb-4">
                  Anime : <span>{animeQoutesData.anime}</span>
                </p>
                <p className="text-gray-700 text-base mb-4">
                  Qoute : <span>{animeQoutesData.quote}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <div className="bg-black md:h-[4.5rem] items-center">
          <h1 className="text-white text-center pt-5 text-lg font-mont">
            All &copy; Copyrights reserved by Chacha Lali ☕
          </h1>
        </div>
      </footer>
    </>
  );
}

export default Animedata;
