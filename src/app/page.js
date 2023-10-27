"use client";
import React from "react";
import App from "./components/App";
import store from "./components/store";
import { Provider } from "react-redux";

function page() {
  return (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
}

export default page;

