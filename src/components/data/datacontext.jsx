import { createContext, useState, useEffect } from "react";
import axios from "axios";
import urls from "../../urls/url";

const user_data = JSON.parse(localStorage.getItem("user")) ? true : false;
const all_videos_data = JSON.parse(localStorage.getItem("videos"))
  ? JSON.parse(localStorage.getItem("videos"))
  : false;

const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [user, set_user] = useState(user_data);
  const [all_videos, set_all_videos] = useState(all_videos_data);
  useEffect(() => {
    if (!user && window.location.pathname !== "/") {
      window.location.pathname = "/";
    }
    get_all_videos();
  }, []);
  const log_out = (e) => {
    set_user(false);
    localStorage.setItem("user", JSON.stringify(false));
    window.location.pathname = "/";
  };
  const get_all_videos = () => {
    axios
      .get(urls.all_videos)
      .then((res) => {
        const { result, response, error } = res.data;
        if (result) {
          const sorted = sort_videos_by_place(response);
          set_all_videos(sorted);
          localStorage.setItem("videos", JSON.stringify(sorted));
          console.log(response);
        } else {
          console.log(error);
          alert("مشکلی در گرفتن ویدئو های پیش آمده");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی در گرفتن ویدئو های پیش آمده");
      });
  };
  const sort_videos_by_place = (arr) => {
    const sorted = [];
    for (let i = 1; i <= arr.length; i++) {
      const in_place = arr.find((item) => item.place === i);
      if (in_place) sorted.push(in_place);
    }
    return sorted;
  };
  return (
    <DataContext.Provider
      value={{
        user,
        set_user,
        log_out,
        get_all_videos,
        all_videos,
        set_all_videos,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
