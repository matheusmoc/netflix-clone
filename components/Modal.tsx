import MuiModal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import { modalState, movieState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ReactPlayer from "react-player/lazy";
import { useEffect, useState } from "react";
import { Element, Genre, Movie } from "../typing";
import { FaPlay, FaRegThumbsUp, FaVolumeOff, FaVolumeUp } from "react-icons/fa";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [Movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);

  // console.log(Movie)

  useEffect(() => {
    if (!Movie) return;
    //fetch to for only one single result
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          Movie?.media_type === "tv" ? "tv" : "movie"
        }/${Movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [Movie]);

  const handleClose = () => {
    setShowModal(false);
  };
  console.log(trailer);

  return (
    <Backdrop onClick={handleClose} className="backdrop-blur-sm" open={true}>
      <MuiModal
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md no-scrollbar"
        open={showModal}
        hideBackdrop
      >
        <>
          <button
            className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-red-700"
            onClick={handleClose}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              muted={muted}
            />
            <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
              <div className="flex space-x-2">
                <button className="flex items-center gap-x-2 rounded bg-white px-5 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                  <FaPlay className="h-7 w-7 text-black" />
                  Watch
                </button>

                <button className="modalButton">
                  <PlusIcon className="h-7 w-7" />
                </button>

                <button className="modalButton">
                  <FaRegThumbsUp className="h-7 w-7" />
                </button>
              </div>
              <button className="modalButton" onClick={() => setMuted(!muted)}>
                {muted ? (
                  <FaVolumeOff className="h-7 w-7" />
                ) : (
                  <FaVolumeUp className="h-7 w-7" />
                )}
              </button>
            </div>
          </div>

          <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="flex items-center space-x-2 text-sm">
                <p className="font-semibold text-green-600">
                  {Movie!.vote_average * 10}% Match
                </p>
                <p className="font-light">
                  {Movie!.release_date || Movie?.first_air_date}
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                  HD
                </div>
              </div>
              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <p className="w-5/6">{Movie?.overview}</p>
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">Genres: </span>
                    {genres.map((genre) => genre.name).join(", ")}
                  </div>

                  <div>
                    <span className="text-[gray]">Original language: </span>
                    {Movie?.original_language}
                  </div>

                  <div>
                    <span className="text-[gray]">Total votes: </span>
                    {Movie?.vote_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </MuiModal>
    </Backdrop>
  );
}

export default Modal;
