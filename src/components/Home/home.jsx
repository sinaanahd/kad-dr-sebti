import React, { useContext, useState } from "react";
import { DataContext } from "../data/datacontext";
import { Helmet } from "react-helmet";
import DrVideo from "../DrVideo/DrVideo";
const Home = () => {
  const { all_videos } = useContext(DataContext);
  return (
    <>
      <Helmet>
        <title>دکتر سبطی | تمامی ویدئو‌ها</title>
      </Helmet>
      <div className="home-page-wrapper">
        <h1 className="page-title">تمامی ویدئو‌ها</h1>
        <section className="video-wrappers">
          {all_videos
            ? all_videos.map((video) => (
                <DrVideo video={video} key={video.id} />
              ))
            : "در حال بارگذاری ویدئو ها"}
        </section>
      </div>
    </>
  );
};

export default Home;
