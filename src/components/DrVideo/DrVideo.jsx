import React, { useState } from "react";
import AparatVideo from "../video/aparat-video";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scrollToTop from "../functions/scroll";
const DrVideo = ({ video }) => {
  return (
    <div className="video-component">
      <h2 className="video-title">{video.title}</h2>
      <div className="need-div-aparat">
        <AparatVideo
          src={video.iframe}
          //  src={video.iframe}
        />
      </div>
      <Link
        to={`/videos/${video.id}`}
        className="video-link-btn"
        onClick={() => {
          scrollToTop();
        }}
      >
        مشاهده ویدئو
      </Link>
    </div>
  );
};

export default DrVideo;
