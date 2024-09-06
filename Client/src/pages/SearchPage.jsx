import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSearchMovies } from "../utils/api";
import Card from "../components/Card";
const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    try {
      const response = await getSearchMovies({
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });
      const newData = response.data.results;
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData();
  }, [location?.search]);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Result
        </h3>
      </div>

      <div className=" grid grid-cols-[repeat(auto-fit,228px)] gap-6 justify-items-center justify-center lg:justify-start">
        {data.map((searchData) => {
          <Card
            data={searchData}
            key={searchData.id + "search"}
            media_type={searchData.media_type}
          />;
        })}
      </div>
    </div>
  );
};

export default SearchPage;
