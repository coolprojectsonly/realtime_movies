"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Movie.module.css";
import { getMovies } from "./action";
import { animate, motion } from "framer-motion";

function App() {
  const dispatch = useDispatch();

  const { data, status, error } = useSelector((state) => state.post);
  const [imageUrls, setImageUrls] = useState();
  const [movieData, setMovieData] = useState(null);
  const [grids, setGrids] = useState("2fr 1fr 1fr 1fr 1fr 1fr");

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const handleDisplay = () => {
    const imageUrls = data?.results?.map((item) => item.primaryImage?.url);
    const imageData = imageUrls.filter((item) => item !== undefined);
    return setImageUrls(imageData);
  };

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  if (status === "error") {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div>
      <h1>
        RealTime Upcoming Movies &{" "}
        <span className={styles.spanBlue}>Series</span>
      </h1>
      <div className={styles.headerSection}>
        <button onClick={handleDisplay}>Refresh List</button>
      </div>
      <motion.div
        whileHover={{ gridColumn: "1 / span 2" }}
        transition={{ type: "ease-in-out", duration: 0.5 }}
        className={styles.imageWrapper}
        style={{ display: "grid", gridTemplateColumns: grids }}
      >
        {imageUrls &&
          data?.results
            ?.filter((item) => item.primaryImage?.url !== undefined)
            .map((items, index) => (
              <motion.div
                className={styles.coverDiv}
                key={index}
                style={{ opacity: movieData ? 0.2 : 1 }}
              >
                <motion.div className={styles.imageContainer}>
                  <motion.img
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0.5 }}
                    src={items?.primaryImage?.url}
                    onMouseMove={() =>
                      setGrids(
                        index === 0
                          ? "2fr 1fr 1fr 1fr 1fr 1fr"
                          : index === 1
                          ? "1fr 2fr 1fr 1fr 1fr 1fr"
                          : index === 2
                          ? "1fr 1fr 2fr 1fr 1fr 1fr"
                          : index === 3
                          ? "1fr 1fr 1fr 2fr 1fr 1fr"
                          : index === 4
                          ? "1fr 1fr 1fr 1fr 2fr 1fr"
                          : index === 5
                          ? "1fr 1fr 1fr 1fr 1fr 2fr"
                          : "1fr 1fr 1fr 1fr 1fr 1fr"
                      )
                    }
                    onClick={() =>
                      setMovieData({
                        url: items.primaryImage.url,
                        title: items.titleText.text,
                        time: items.releaseDate,
                      })
                    }
                  />
                </motion.div>
              </motion.div>
            ))}
        {movieData && (
          <div className={styles.infoContainer}>
            <div className={styles.modalImage}>
              <img src={movieData.url} />
            </div>
            <div
              className={styles.infoData}
              style={{ position: "relative", backgroundColor: "whitesmoke" }}
            >
              <div
                style={{
                  width: "100%",
                  //   top: "20%",

                  justifyContent: "center",
                  height: "80px",
                  alignItems: "center",
                  display: "flex",
                  marginBottom: 0,
                  border: "1px 0 0 0 solid lightblue",
                  boxShadow: "5px 5px 10px 0 rgba(255, 255, 255, 0.5)",
                }}
              >
                <h1 style={{ color: "indigo" }}>{movieData.title}</h1>
              </div>
              <div
                style={{
                  width: "100%",
                  //   top: "20%",

                  justifyContent: "center",
                  height: "80px",
                  alignItems: "center",
                  display: "flex",
                  marginBottom: 0,
                  border: "0 1px 0 0 solid lightblue",
                  boxShadow: "5px 5px 10px 0 rgba(245, 245, 220, 0.5)",
                }}
              >
                <h2 style={{ color: "blue", marginTop: "10px" }}>
                  Release date:{movieData.time.day} / {movieData.time.month} /{" "}
                  {movieData.time.year}{" "}
                </h2>
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  //   top: "20%",
                  bottom: "10%",

                  justifyContent: "center",
                  height: "80px",
                  alignItems: "center",
                  display: "flex",
                  marginBottom: 0,
                  border: "0 0 1px 0 solid lightblue",
                  boxShadow: "5px 5px 10px 0 rgba(0, 0, 0, 0.5)",
                }}
              >
                {" "}
                <button className={styles.orderButton}>Order Now</button>{" "}
              </div>
              <button
                onClick={() => setMovieData(null)}
                style={{
                  position: "absolute",
                  top: "0%",
                  right: "0%",
                  padding: 0,
                  margin: 0,
                  backgroundColor: "transparent",
                  color: "red",
                }}
                className={styles.resetButton}
              >
                X
              </button>{" "}
            </div>
          </div>
        )}
      </motion.div>
      )
    </div>
  );
}

export default App;
