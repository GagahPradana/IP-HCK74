import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../utils/fetchData";
import useFetchDetails from "../utils/fetchDataDetails";

const DetailPage = () => {
  const params = useParams();
  const { data } = useFetchDetails(`/${params.explore}/${params.id}`);
  console.log(data, "data");

  return <div>DetailPage</div>;
};

export default DetailPage;
