import React from "react";
import InstanceColumn from "../InstanceColumn/InstanceColumn";
import Arrow from "../Arrow/Arrow";
import style from "./Chart.module.css";

const Chart = ({ data }) => {
  if (!data) return null;

  // Суммарные значения для каждого инстанса (dev, test, prod)
  const devTotal = data.dev.front + data.dev.back + data.dev.db;
  const testTotal = data.test.front + data.test.back + data.test.db;
  const prodTotal = data.prod.front + data.prod.back + data.prod.db;

  // Отклонения между инстансами
  const devToTestDiff = testTotal - devTotal;
  const testToProdDiff = prodTotal - testTotal;

  return (
    <div className={style.chart_container}>
      <h2 className="visually-hidden">{data.title}</h2>
      <div className={style.chart}>
        <InstanceColumn label="dev" instanceData={data.dev} />
        <Arrow difference={devToTestDiff} />
        <InstanceColumn label="test" instanceData={data.test} />
        <Arrow difference={testToProdDiff} />
        <InstanceColumn label="prod" instanceData={data.prod} />
        <InstanceColumn label="норматив" normValue={data.norm} />
      </div>
    </div>
  );
};

export default Chart;
