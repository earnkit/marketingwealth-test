import { useState, useEffect } from "react";
import { Table, Row, Col, Button } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ShowDataList from "./component/ShowDataList";


const App = () => {
  return (
    <>
      <ToastContainer />
      <ShowDataList />
    </>
  );
};

export default App;
