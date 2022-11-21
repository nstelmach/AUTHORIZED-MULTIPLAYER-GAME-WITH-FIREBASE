import React from "react";
import { Chart } from "react-google-charts";
import classes from "./History.module.css";
import Header from "./Header";

function History() {
  const data = [
    ["Result", "Quantity"],
    ["Wins", 2],
    ["Looses", 1],
  ];

  const options = {
    colors: ["#2A6767", "#edcd5a"],
    backgroundColor: "#4daaaa",
    legendTextStyle: { color: "white" },
  };

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.contentWrapper}>
        <h1 className={classes.subtitles}>Previous Games</h1>
        <div className={classes.tableWrapper}>
          <table className={classes.table}>
            <tr>
              <th className={`${classes.table} ${classes.th}`}>Date</th>
              <th className={`${classes.table} ${classes.th}`}>Oponent</th>
              <th className={`${classes.table} ${classes.th}`}>Result</th>
              <th className={`${classes.table} ${classes.th}`}>Winner</th>
            </tr>
            <tr>
              <td className={`${classes.table} ${classes.td}`}>24.10.2022</td>
              <td className={`${classes.table} ${classes.td}`}>Player</td>
              <td className={`${classes.table} ${classes.td}`}>4:0</td>
              <td className={`${classes.table} ${classes.td}`}>You</td>
            </tr>
            <tr>
              <td className={`${classes.table} ${classes.td}`}>23.10.2022</td>
              <td className={`${classes.table} ${classes.td}`}>Computer</td>
              <td className={`${classes.table} ${classes.td}`}>2:3</td>
              <td className={`${classes.table} ${classes.td}`}>You</td>
            </tr>
          </table>
        </div>
        <div className={classes.chartWrapper}>
          <h2 className={`${classes.subtitles} ${classes.statistics}`}>
            Statistics
          </h2>
          <Chart
            className={classes.chart}
            chartType="PieChart"
            data={data}
            options={options}
            height="300px"
            width="500px"
          />
        </div>
      </div>
    </div>
  );
}

export default History;
