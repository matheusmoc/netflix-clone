import Image from "next/image";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typing";
import { FaPlay, FaInfoCircle} from 'react-icons/fa';

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [Movie, setMovie] = useState<Movie | null>(null); //return movie or null

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  console.log(Movie);
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[70vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${Movie?.backdrop_path || Movie?.poster_path}`} // optional = ?
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-4xl lg:text-7xl font-bold">
        {Movie?.title || Movie?.original_name}
      </h1>

      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {Movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-slate-200 text-black"><FaPlay className="h-4 w-4 text-black md:h-7 md:w-7"/>Play</button>
        <button className="bannerButton bg-slate-500/20 text-white"><FaInfoCircle className="h-5 w-5 md:h-8 md:w-8"/>More info</button>
      </div>
    </div>
  );
}

export default Banner;
