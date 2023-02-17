import React from 'react';
import Chart from 'chart.js/auto';

const DataChart = (props) => {
    return <canvas ref={props.chartRef} />;
}

export default DataChart;