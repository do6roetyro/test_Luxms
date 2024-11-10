import React, { useRef, useEffect, useState } from "react";
import InstanceColumn from "../InstanceColumn/InstanceColumn";
import DifferenceInfo from "../DifferenceInfo/DifferenceInfo";
import ArrowPath from "../Arrow/ArrowPath";
import ArrowMarkerDefs from "../Arrow/ArrowMarkerDefs";
import {
  createUShapedArrowPath,
  calculateTotal,
  calculateDifference,
} from "../../utils/createArrowPaths";
import style from "./Chart.module.css";

const Chart = ({ data }) => {
  const devRef = useRef(null);
  const testRef = useRef(null);
  const prodRef = useRef(null);
  const [positions, setPositions] = useState({});

  const calculatePositions = (devPos, testPos, prodPos) => ({
    devToTest: createUShapedArrowPath(
      devPos.x + 39,
      devPos.y,
      testPos.x + 30,
      testPos.y
    ),
    testToProd: createUShapedArrowPath(
      testPos.x + 48,
      testPos.y,
      prodPos.x + 35,
      prodPos.y
    ),
  });

  useEffect(() => {
    const devPos = devRef.current?.getBoundingClientRect();
    const testPos = testRef.current?.getBoundingClientRect();
    const prodPos = prodRef.current?.getBoundingClientRect();

    if (devPos && testPos && prodPos) {
      setPositions(calculatePositions(devPos, testPos, prodPos));
    }
  }, [data]);

  if (!data) return null;

  const devTotal = calculateTotal(data.dev);
  const testTotal = calculateTotal(data.test);
  const prodTotal = calculateTotal(data.prod);
  const maxTotal = Math.max(devTotal, testTotal, prodTotal);
  const maxChartHeight = 400;
  const devToTestDiff = calculateDifference(devTotal, testTotal);
  const testToProdDiff = calculateDifference(testTotal, prodTotal);

  return (
    <div className={style.test}>
      <div className={style.chart_container}>
        <h2 className="visually-hidden">{data.title}</h2>
        <div className={style.chart}>
          <div ref={devRef}>
            <InstanceColumn
              label="dev"
              instanceData={data.dev}
              maxTotal={maxTotal}
              maxChartHeight={maxChartHeight}
            />
          </div>
          <DifferenceInfo difference={devToTestDiff} index={1} />
          <div ref={testRef}>
            <InstanceColumn
              label="test"
              instanceData={data.test}
              maxTotal={maxTotal}
              maxChartHeight={maxChartHeight}
            />
          </div>
          <DifferenceInfo difference={testToProdDiff} index={2} />
          <div ref={prodRef}>
            <InstanceColumn
              label="prod"
              instanceData={data.prod}
              maxTotal={maxTotal}
              maxChartHeight={maxChartHeight}
            />
          </div>
          <InstanceColumn
            label="норматив"
            normValue={data.norm}
            maxTotal={maxTotal}
            maxChartHeight={maxChartHeight}
          />
          <svg className={style.arrow_svg}>
            <ArrowPath d={positions.devToTest} />
            <ArrowPath d={positions.testToProd} />
            <ArrowMarkerDefs />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Chart;
