import React, { useRef, useEffect, useState } from "react";
import InstanceColumn from "../InstanceColumn/InstanceColumn";
import DifferenceInfo from "../DifferenceInfo/DifferenceInfo";
import style from "./Chart.module.css";

const Chart = ({ data }) => {
  const devRef = useRef(null);
  const testRef = useRef(null);
  const prodRef = useRef(null);
  const [positions, setPositions] = useState({});

  // Функция для создания П-образного пути стрелки
  const createUShapedArrowPath = (startX, startY, endX, endY) => {
    // Координаты подъема вверх
    const midY = 168;
    console.log(startX, startY, endX, endY);
    
    // Строка команды для SVG-пути
    return `M${startX},${startY} V${midY} H${endX} V${endY}`;
  };

  const [clickPosition, setClickPosition] = useState(null);

useEffect(() => {
  const handleClick = (event) => {
    const { clientX, clientY } = event;
    console.log({ clientX, clientY })
    setClickPosition({ x: clientX, y: clientY });

  };

  document.addEventListener("click", handleClick);

  return () => {
    document.removeEventListener("click", handleClick);
  };
}, []);

  useEffect(() => {
    // Получаем позиции и размеры элементов после их рендеринга
    const devPos = devRef.current?.getBoundingClientRect();
    const testPos = testRef.current?.getBoundingClientRect();
    const prodPos = prodRef.current?.getBoundingClientRect();
    console.log('devPos' , devPos)
    console.log('testPos' , testPos)
    console.log('prodPos' , prodPos)

    

    if (devPos && testPos && prodPos) {
      setPositions({
        devToTest: createUShapedArrowPath(
          devPos.x + 39, //startX
          devPos.y, //startY
          testPos.x + 30 , //endX
          testPos.y, //endY
        ),
        testToProd: createUShapedArrowPath(
          testPos.x + 48,
          testPos.y,
          prodPos.x + 40,
          prodPos.y,
        ),
      });
    }
  }, [data]);

  if (!data) return null;

  const devTotal = data.dev.front + data.dev.back + data.dev.db;
  const testTotal = data.test.front + data.test.back + data.test.db;
  const prodTotal = data.prod.front + data.prod.back + data.prod.db;
  const maxTotal = Math.max(devTotal, testTotal, prodTotal);
  const maxChartHeight = 400;
  const devToTestDiff = testTotal - devTotal;
  const testToProdDiff = prodTotal - testTotal;

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

          {/* SVG с П-образными путями для стрелок */}
          <svg className={style.arrow_svg}>
            <path
              d={positions.devToTest}
              stroke="gray"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            <path
              d={positions.testToProd}
              stroke="gray"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            {/* Определение маркера стрелки */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="4"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 5 3.5, 0 7" fill="#898290" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Chart;
