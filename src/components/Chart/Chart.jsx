import React from "react";
import InstanceColumn from "../InstanceColumn";
import Arrow from "../Arrow/Arrow";

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
    <div className="chart-container">
      <h2 className="visually-hidden">{data.title}</h2>
      <div className="chart">
        <InstanceColumn label="dev" instanceData={data.dev} />

        {/* Стрелка между dev и test */}
        <Arrow difference={devToTestDiff} />

        <InstanceColumn label="test" instanceData={data.test} />

        {/* Стрелка между test и prod */}
        <Arrow difference={testToProdDiff} />

        <InstanceColumn label="prod" instanceData={data.prod} />

        {/* Нормативный столбец */}
        <InstanceColumn label="норматив" normValue={data.norm} />
      </div>
    </div>
  );
};

export default Chart;
