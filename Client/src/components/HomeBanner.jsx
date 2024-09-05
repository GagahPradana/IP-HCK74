import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";

function HomeBanner() {
  const bannerData = useSelector((state) => state.gmovieData.bannerData);
  const imageURL = useSelector((state) => state.gmovieData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {}, [currentImage]);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    } else {
      setCurrentImage(bannerData.length - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData, imageURL]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => (
          <div
            key={data.id + "BannerHome" + index}
            className={`min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all duration-500 ease-in-out`}
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            <div className="w-full h-full">
              <img
                src={imageURL + data.backdrop_path}
                alt={data.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Next and Previous buttons */}
            <div className="absolute top-0 w-full h-full hidden items-center justify-between px-5 group-hover:flex">
              <button
                onClick={handlePrevious}
                className="text-2xl bg-zinc-800  z-10 text-zinc-400"
              >
                <VscTriangleLeft />
              </button>
              <button
                onClick={handleNext}
                className="text-2xl bg-zinc-800  z-10 text-zinc-400"
              >
                <VscTriangleRight />
              </button>
            </div>

            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-zinc-950 to-transparent"></div>
            <div className="container mx-auto">
              <div className=" w-full absolute bottom-0 max-w-md px-3">
                <h2 className="font-bold text-2xl lg:text-4xl text-zinc-100 drop-shadow-2xl">
                  {data.title}
                </h2>
                <p className="text-ellipsis line-clamp-3 my-2">
                  {data.overview}
                </p>
                <div className="flex items-center gap-4">
                  <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                  <p>View: {Number(data.popularity).toFixed(0)}</p>
                </div>
                <button className="bg-zinc-100 px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-800 to-orange-500 shadow-md transition-all hover:scale-105">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeBanner;
