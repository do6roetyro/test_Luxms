import React from "react";
import InstanceColumn from "../InstanceColumn";

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
      <h2>{data.title}</h2>
      <div className="chart">
        <InstanceColumn label="dev" instanceData={data.dev} />
        <div className="arrow">
          <span>
            {devToTestDiff >= 0 ? `+${devToTestDiff}` : devToTestDiff}
          </span>
        </div>
        <InstanceColumn label="test" instanceData={data.test} />
        <div className="arrow">
          <span>
            {testToProdDiff >= 0 ? `+${testToProdDiff}` : testToProdDiff}
          </span>
        </div>
        <InstanceColumn label="prod" instanceData={data.prod} />
        <InstanceColumn label="норматив" normValue={data.norm} />
      </div>
    </div>
  );
};

export default Chart;
