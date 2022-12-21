import React from "react";
import classes from "./History.module.css";
import useTable from "../../hooks/useHistoryTable";
import { RotatingLines } from "react-loader-spinner";

function History() {
  const { table, isFetching } = useTable();

  function renderTable() {
    return table?.map((obj, index) => (
      <tr key={index}>
        <td className={`${classes.table} ${classes.td}`}>{obj.date}</td>
        <td className={`${classes.table} ${classes.td}`}>{obj.oponent}</td>
        <td className={`${classes.table} ${classes.td}`}>{obj.winner}</td>
      </tr>
    ));
  }

  if (isFetching) {
    return <RotatingLines strokeColor="#edcd5a" width="120" />;
  }

  return (
    <>
      <h1 className={classes.subtitles}>Previous Games</h1>
      <div className={classes.tableWrapper}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={`${classes.table} ${classes.th}`}>Date</th>
              <th className={`${classes.table} ${classes.th}`}>Oponent</th>
              <th className={`${classes.table} ${classes.th}`}>Winner</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </>
  );
}

export default History;
