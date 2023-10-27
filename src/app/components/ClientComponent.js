"use client";

import React, { useEffect } from "react";
import ServerComponent from "./ServerComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./createReducer";

function ClientComponent() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.post.status);
  const data = useSelector((data) => data.post.data);
  const error = useSelector((error) => error.post.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (state === "Loading") {
    return <h1>Loading</h1>;
  }

  console.log(data);

  if (state === "error") {
    return <h1>Error occured:{error}</h1>;
  }

  return (
    <div>
      <h1>This is the Client Compenent</h1>
      <ServerComponent />
      {/* {data.map((item, index) => (
        <h1 key={index}>{item.title}</h1>
      ))} */}
      <h1>Hi people</h1>
    </div>
  );
}

export default ClientComponent;
