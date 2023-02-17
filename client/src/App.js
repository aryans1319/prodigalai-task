import React from "react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DataChart from "./DataChart";

const App = () => {
  const [chartData, setChartData] = useState({});
  const chartRef = useRef();
  useEffect(() => {
    axios.get("https://my-api-endpoint.com/data").then((res) => {
      setChartData(res.data);
    });
  }, []);
  return (
    <div>
      <DataChart chartData={chartData} chartRef={chartRef} />
    </div>
  );
};

export default App;
