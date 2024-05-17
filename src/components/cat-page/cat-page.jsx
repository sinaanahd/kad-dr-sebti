import {
  default as React,
  default as React,
  useContext,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import DrVideo from "../DrVideo/DrVideo";

const CatPage = () => {
  const { all_videos } = useContext(DataContext);
  const [filter, set_filter] = useState(false);
  const seprate_cats = (videos) => {
    const cats = [];
    const orgenized_videos = [];
    videos.forEach((video) => {
      const this_cat = video.cluster;
      if (cats.includes(this_cat)) {
        const orgenized_video = orgenized_videos.find(
          (v) => v.title === this_cat
        );
        orgenized_video.videos.push(video);
      } else {
        const video_object = {
          title: video.cluster,
          videos: [video],
        };
        orgenized_videos.push(video_object);
        cats.push(video.cluster);
      }
    });
    return [orgenized_videos, filter];
  };
  const video_cats = all_videos
    ? seprate_cats(all_videos)[0].map((v) => v.title)
    : false;

  const filter_videos = (cat) => {
    set_filter(cat);
  };
  return (
    <>
      <Helmet>
        <title>دکتر سبطی | تمامی ویدئو‌ها</title>
      </Helmet>
      <div className="home-page-wrapper">
        <h1 className="page-title">دسته بندی ویدئو‌ها</h1>
        <section className="video-btns">
          <button
            className={!filter ? "video-cat-btn active" : "video-cat-btn"}
            onClick={() => {
              filter_videos(false);
            }}
          >
            تمام ویدئوها
          </button>
          {video_cats
            ? video_cats.map((v, i) => (
                <button
                  className={
                    v === filter ? "video-cat-btn active" : "video-cat-btn"
                  }
                  key={i++}
                  onClick={() => {
                    filter_videos(v);
                  }}
                >
                  {v}
                </button>
              ))
            : "در حال بارگذاری"}
        </section>
        <section className="video-wrappers">
          {all_videos
            ? !seprate_cats(all_videos)[1]
              ? seprate_cats(all_videos)[0].map((video_cat, i) => (
                  <div className="video-group-wrapper" key={i++}>
                    <h2 className="semi-title">{video_cat.title}</h2>
                    <div className="video-group">
                      {video_cat.videos.map((video) => (
                        <DrVideo video={video} key={video.id} />
                      ))}
                    </div>
                  </div>
                ))
              : seprate_cats(all_videos)[0]
                  .filter((v) => v.title === seprate_cats(all_videos)[1])
                  .map((video_cat, i) => (
                    <div className="video-group-wrapper" key={i++}>
                      <h2 className="semi-title">{video_cat.title}</h2>
                      <div className="video-group">
                        {video_cat.videos.map((video) => (
                          <DrVideo video={video} key={video.id} />
                        ))}
                      </div>
                    </div>
                  ))
            : "در حال بارگذاری ویدئو ها"}
        </section>
      </div>
    </>
  );
};

export default CatPage;
