import logo from "./logo.svg";
import "./asset/css/index.scss";
import { DataContext } from "./components/data/datacontext";
import { useContext, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom/cjs/react-router-dom.min";
import LittleLoading from "./components/reuseables/little-loading";
import Header from "./components/Header/header";
import Login from "./components/Login/login.jsx";
import Home from "./components/Home/home.jsx";
import SingleVideo from "./components/single-video/single-video.jsx";

function App() {
  const { user } = useContext(DataContext);
  return (
    <>
      <BrowserRouter>
        {user ? <Header /> : <></>}
        <main className="page-wrapper mm-width">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/videos/:id" component={SingleVideo} />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
