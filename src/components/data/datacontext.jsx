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
          set_all_videos(response);
          localStorage.setItem("videos", JSON.stringify(response));
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
