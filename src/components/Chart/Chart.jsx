import React from "react";
import InstanceColumn from "../InstanceColumn/InstanceColumn";
import Arrow from "../Arrow/Arrow";
import style from "./Chart.module.css";

const Chart = ({ data }) => {
  if (!data) return null;

  // Суммарные значения для каждого инстанса
  const devTotal = data.dev.front + data.dev.back + data.dev.db;
  const testTotal = data.test.front + data.test.back + data.test.db;
  const prodTotal = data.prod.front + data.prod.back + data.prod.db;

  // Находим максимальное значение среди всех инстансов
  const maxTotal = Math.max(devTotal, testTotal, prodTotal);

  // Максимальная высота столбика в пикселях
  const maxChartHeight = 400;

  // Отклонения между инстансами
  const devToTestDiff = testTotal - devTotal;
  const testToProdDiff = prodTotal - testTotal;

  return (
    <div className={style.chart_container}>
      <h2 className="visually-hidden">{data.title}</h2>
      <div className={style.chart}>
        <InstanceColumn
          label="dev"
          instanceData={data.dev}
          maxTotal={maxTotal}
          maxChartHeight={maxChartHeight}
        />
        <Arrow difference={devToTestDiff} index={1} />
        <InstanceColumn
          label="test"
          instanceData={data.test}
          maxTotal={maxTotal}
          maxChartHeight={maxChartHeight}
        />
        <Arrow difference={testToProdDiff} index={2} />
        <InstanceColumn
          label="prod"
          instanceData={data.prod}
          maxTotal={maxTotal}
          maxChartHeight={maxChartHeight}
        />
        <InstanceColumn
          label="норматив"
          normValue={data.norm}
          maxTotal={maxTotal}
          maxChartHeight={maxChartHeight}
        />
      </div>
    </div>
  );
};

export default Chart;
