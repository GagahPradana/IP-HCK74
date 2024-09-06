import React, { useEffect, useState } from "react";
import AddMyListName from "./AddListName";
import { deleteMovie } from "../utils/api";

function CreateList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myList, setMyList] = useState([]);

  const fetchMovies = async () => {
    try {
      const { data } = await serverApi.get("/movies", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setMyList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleOnDelete = async () => {
    try {
      const { data } = await deleteMovie({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      fetchMovies();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const backgroundImageUrl =
    "https://user-images.githubusercontent.com/16425113/129554147-6ac7ba51-43e7-4c8e-ba77-e646a3ef6b12.jpg";

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center p-8 bg-black bg-opacity-80">
          <h1 className="text-3xl md:text-4xl text-gray-300 font-medium mb-4">
            Welcome to the add list page. In here you can add your own list
            movie.
          </h1>
          <button
            className="mt-4 px-6 py-3 bg-zinc-800 hover:bg-zinc-900 text-white rounded-md shadow-md transition duration-200"
            onClick={handleOpenModal}
          >
            Start your own list
          </button>
        </div>
        {isModalOpen && <AddMyListName onClose={handleCloseModal} />}
      </div>
      <button onClick={handleOnDelete}></button>
    </>
  );
}

export default CreateList;
