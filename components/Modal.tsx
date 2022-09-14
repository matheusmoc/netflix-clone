import MuiModal from "@mui/material/Modal";
import { modalState, movieState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { Element, Genre, Movie } from "../typing";

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
          Movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${Movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json())
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [Movie])

  const handleClose = () => {
    setShowModal(false);
  };
  console.log(trailer);

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-red-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div>
        <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
        </div>
      </>
    </MuiModal>

  );
}

export default Modal;
