import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchData = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/${params.explore}`,
        {
          params: { page },
        }
      );
      const newData = response.data.results;
      setData((prevData) => [...prevData, ...newData]);
      setHasMore(newData.length > 0 && page < response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [params.explore, page, hasMore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPage(1);
    setData([]);
    setHasMore(true);
  }, [params.explore]);

  return (
    <div className=" pt-16">
      <div className=" container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          ALL {params.explore}
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,228px)] gap-6 justify-center lg:justify-normal">
          {data.map((exploreData, index) => {
            if (data.length === index + 1) {
              return (
                <div
                  ref={lastElementRef}
                  key={exploreData.id + "exploreSection"}
                >
                  <Card data={exploreData} media_type={params.explore} />
                </div>
              );
            } else {
              return (
                <Card
                  data={exploreData}
                  key={exploreData.id + "exploreSection"}
                  media_type={params.explore}
                />
              );
            }
          })}
        </div>
        {loading && <p>Loading more...</p>}
        {!hasMore && <p>No more items to load</p>}
      </div>
    </div>
  );
};

export default ExplorePage;
