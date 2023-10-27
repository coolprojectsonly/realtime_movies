import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk("/post/getMovies", async () => {
  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming",
    headers: {
      "X-RapidAPI-Key": "35360dea7cmshdbe7fec6300c773p10ff91jsnf1424cb37790",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data;
});
