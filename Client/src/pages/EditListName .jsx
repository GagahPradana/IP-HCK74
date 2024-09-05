import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addListNameMovie, getListName } from "../utils/api";

function EditMyListName({ onClose }) {
  const { id } = useParams();
  const [listName, setListName] = useState("");

  const navigate = useNavigate();

  const fetchUpdateListName = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await addListNameMovie(listName, token);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (listName.trim()) {
      await fetchUpdateListName();
      navigate("/mylist");
    } else {
      console.log("List name cannot be empty");
    }
  };
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getListName(token, id);

        const movieData = response.data;
        setListName(movieData.listName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobDetail();
  }, [id]);
  return (
    <div>
      <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
        <div className="w-full max-w-lg bg-zinc-800 shadow-lg rounded-md p-8 relative">
          <svg
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 cursor-pointer shrink-0 fill-zinc-400 hover:fill-red-500 float-right"
            viewBox="0 0 320.591 320.591"
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"
            />
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"
            />
          </svg>
          <form onSubmit={handleSubmit}>
            <div className="my-8 text-center">
              <h4 className="text-2xl text-zinc-00 font-bold">
                Add Your Own List Name Movie
              </h4>
              <p className="text-sm text-gray-500 mt-2">
                exp: My top 10 movies
              </p>
              <input
                type="text"
                name="listName"
                placeholder="Enter Your List Name"
                className="px-4 py-2.5 mt-6 bg-zinc-600 w-full text-sm focus:bg-transparent outline-zinc-600 rounded-md"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 w-full rounded-md text-white text-sm outline-none bg-zinc-600 hover:bg-zinc-700"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMyListName;
