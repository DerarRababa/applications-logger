import React from "react";
import "../index.css";
import VisibleLoggerSearch from "../pages/Home/Administration/LoggerSearch/visible_logger_search";
import Home from "../pages/Home/home";
import Administration from "../pages/Home/Administration/administration";

import { Provider } from "react-redux";
import rootReducer from "../store/reducers";
import { createStore } from "redux";

import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const DefaultLayout = () => {
  const store = createStore(rootReducer);

  return (

    <Provider store={store}>
      <BrowserRouter>
       <Header />

        <Routes>
        <Route path="/" element={<Navigate replace to="/home/administration/logger-search" />} />

          <Route path="/home/administration/logger-search" element={<VisibleLoggerSearch />}>
          </Route>
          <Route path="/home" element={<Home />}>
          </Route>
          <Route
            path="/home/administration"
            element={<Administration />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default DefaultLayout;
