import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector((state) => state.gmovieData.imageURL);
  const mediaType = data.media_type ?? media_type;
  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full min-w-[228px] max-w-[228px] rounded h-80 block overflow-hidden relative hover:scale-105"
    >
      <img src={imageURL + data?.poster_path} alt="image movie" />

      <div className="absolute top-2">
        {trending && (
          <div className="py-1 px-4 backdrop-blur-3xl   rounded-r-full bg-black/45 overflow-hidden">
            #{index} Trending
          </div>
        )}
      </div>

      <div className=" absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text:lg font-semibold">
          {data?.title}
        </h2>
        <div className="text-sm text-zinc-400 flex justify-between items-center">
          <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
          <p className="bg-black/45 px-1 rounded-full text-xs text-zinc-200">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
