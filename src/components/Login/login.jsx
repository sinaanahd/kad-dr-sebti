import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import urls from "../../urls/url";
import { DataContext } from "../data/datacontext";
import LittleLoading from "../reuseables/little-loading";

const Login = () => {
  const { user, set_user } = useContext(DataContext);
  const [show, set_show] = useState(false);
  const [pass, set_pass] = useState(false);
  const [err, set_err] = useState(false);
  const [pause, set_pause] = useState(false);
  useEffect(() => {
    if (user) {
      window.location.pathname = "/home";
    }
  }, []);
  const check_pass = () => {
    set_pause(true);
    axios
      .get(`${urls.user_login}${pass}`)
      .then((res) => {
        console.log(res.data);
        const { result, response, error } = res.data;
        if (result) {
          if (response) {
            set_user(true);
            localStorage.setItem("user", JSON.stringify(true));
            set_err(false);
            window.location.pathname = "/home";
          } else {
            set_err("رمز وارد شده صحیح نمی باشد");
          }
        } else {
          alert("مشکلی پیش آمده لطفا دوباره تلاش کنید");
        }
        set_pause(false);
      })
      .catch((e) => {
        console.log(e);
        alert("مشکلی پیش آمده لطفا دوباره تلاش کنید");
        set_pause(false);
      });
  };
  const handle_pass = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      set_pass(value);
      set_err(false);
    } else {
      set_pass(false);
      set_err("رمزی وارد نشده است");
    }
  };
  const handle_login_with_key = (e) => {
    const key = e.keyCode;
    if (key === 13) {
      check_pass();
    }
  };
  return (
    <>
      <Helmet>
        <title>دکتر سبطی | ورود</title>
      </Helmet>
      <div className="login-page-wrppper">
        <div className="main-content">
          <h1 className="title">وب سایت ویدئو های دکتر سبطی </h1>
          <p className="page-description">
            برای مشاهده ویدئو های دکتر سبطی ابتدا نیاز است که رمز ورودی که در
            اختیار شما قرار داده شده را وارد کنید تا بتوانید به ویدئو ها دسترسی
            داشته باشید
          </p>
          <div className="input-wrapper">
            <span className="input-box">
              <input
                type={show ? "text" : "password"}
                placeholder="رمز عبور خود را وارد کنید"
                className="login-input"
                onInput={handle_pass}
                onKeyDown={handle_login_with_key}
              />
              <button
                className="show-pass-btn"
                onClick={() => {
                  set_show(!show);
                }}
              >
                {!show ? <FaEye /> : <FaEyeSlash />}
              </button>
            </span>
            <button
              className="submit-password"
              disabled={pause}
              onClick={check_pass}
            >
              {pause ? <LittleLoading /> : "ورود"}
            </button>
          </div>
          {err && <div className="error-box-wrapper"> {err} </div>}
        </div>
      </div>
    </>
  );
};

export default Login;
