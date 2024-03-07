import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import AparatVideo from "../video/aparat-video";
import LittleLoading from "../reuseables/little-loading";
import DrVideo from "../DrVideo/DrVideo";
const SingleVideo = () => {
  const { all_videos } = useContext(DataContext);
  const slug = parseInt(window.location.pathname.split("/")[2]);
  const video = all_videos ? all_videos.find((v) => v.id === slug) : false;
  const fill_random_videos = (e) => {
    const random_numbers = [];
    while (random_numbers.length - 1 <= 10) {
      const random_number = Math.ceil(Math.random() * 50);
      if (!random_numbers.includes(random_number)) {
        random_numbers.push(random_number);
      }
    }
    console.log(random_numbers);
  };
  return (
    <>
      <Helmet>
        <title>دکتر سبطی | {video ? video.title : "در حال بارگذاری"}</title>
      </Helmet>
      <div className="single-video-page">
        <h1
          className="title"
          onClick={() => {
            fill_random_videos();
          }}
        >
          {video ? video.title : "در حال بارگذاری"}
        </h1>
        <div className="aparat-safty-div">
          <AparatVideo src={video.iframe} />
        </div>
        {/* <h2 className="semi-title">دیگر ویدئو ها</h2>
        <div className="other-videos-parent-div">
          <div className="other-vidoes-wrapper">
            {all_videos ? (
              all_videos.map((v) => <DrVideo video={v} key={v.id} />)
            ) : (
              <LittleLoading />
            )}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SingleVideo;
