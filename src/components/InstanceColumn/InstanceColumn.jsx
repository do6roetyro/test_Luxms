import React from "react";
import style from "./InstanceColumn.module.css";

const InstanceColumn = ({
  label,
  instanceData,
  normValue,
  maxTotal,
  maxChartHeight,
  // globalMinTotal,
}) => {
  const MIN_SEGMENT_HEIGHT = 24; // Минимальная высота сегмента в пикселях

  const calculateHeight = (value, maxValue) => {
    // Используем логарифмическое масштабирование
    const logValue = Math.log10(value || 1);
    const logMax = Math.log10(maxValue || 1);
    return (logValue / logMax) * maxChartHeight;
  };

  if (normValue !== undefined) {
    let normHeightPx = calculateHeight(normValue, maxTotal) /2.5;

    if (normHeightPx < MIN_SEGMENT_HEIGHT || normValue === 0) {
      normHeightPx = MIN_SEGMENT_HEIGHT;
    }

    return (
      <div className={style.instance_column}>
        <div className={style.column}>
          <div className={style.norm} style={{ height: `${normHeightPx}px` }}>
            <span>{normValue}</span>
          </div>
        </div>
        <div className={style.label}>{label}</div>
      </div>
    );
  }

  // Остальная часть кода для отображения сегментов
  const frontValue = instanceData.front;
  const backValue = instanceData.back;
  const dbValue = instanceData.db;

  // const instanceTotal = frontValue + backValue + dbValue;

  let frontHeightPx = calculateHeight(frontValue, maxTotal) /2.5;
  let backHeightPx = calculateHeight(backValue, maxTotal) /2.5;
  let dbHeightPx = calculateHeight(dbValue, maxTotal) /2.5;

  let segments = [
    { name: "front", value: frontValue, height: frontHeightPx },
    { name: "back", value: backValue, height: backHeightPx },
    { name: "db", value: dbValue, height: dbHeightPx },
  ];

  segments.forEach((segment) => {
    if (segment.height < MIN_SEGMENT_HEIGHT || segment.value === 0) {
      segment.height = MIN_SEGMENT_HEIGHT;
    }
  });

  return (
    <div className={style.instance_column}>
      <div className={style.column}>
        {segments.map((segment) => (
          <div
            key={segment.name}
            className={`${style.segment} ${style[segment.name]}`}
            style={{ height: `${segment.height}px` }}
          >
            <span>{segment.value}</span>
          </div>
        ))}
      </div>
      <div className={style.label}>{label}</div>
    </div>
  );
};

export default InstanceColumn;
