import React from "react";
import style from "./InstanceColumn.module.css";

const InstanceColumn = ({
  label,
  instanceData,
  normValue,
  maxTotal,
  maxChartHeight,
}) => {
  const MIN_SEGMENT_HEIGHT = 24; // Минимальная высота сегмента в пикселях

  if (normValue !== undefined) {
    let normHeightPx = (normValue / maxTotal) * maxChartHeight;

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

  const instanceTotal = frontValue + backValue + dbValue;

  const totalHeightPx = (instanceTotal / maxTotal) * maxChartHeight;
  let frontHeightPx = (frontValue / instanceTotal) * totalHeightPx;
  let backHeightPx = (backValue / instanceTotal) * totalHeightPx;
  let dbHeightPx = (dbValue / instanceTotal) * totalHeightPx;

  let segments = [
    { name: "front", value: frontValue, height: frontHeightPx },
    { name: "back", value: backValue, height: backHeightPx },
    { name: "db", value: dbValue, height: dbHeightPx },
  ];

  let totalMinHeights = 0;
  segments.forEach((segment) => {
    if (segment.height < MIN_SEGMENT_HEIGHT || segment.value === 0) {
      totalMinHeights += MIN_SEGMENT_HEIGHT;
      segment.height = MIN_SEGMENT_HEIGHT;
    }
  });

  const remainingHeightPx = totalHeightPx - totalMinHeights;
  const totalOriginalHeights = segments.reduce((sum, segment) => {
    if (segment.height > MIN_SEGMENT_HEIGHT) {
      return sum + segment.height;
    }
    return sum;
  }, 0);

  segments.forEach((segment) => {
    if (segment.height > MIN_SEGMENT_HEIGHT) {
      segment.height =
        (segment.height / totalOriginalHeights) * remainingHeightPx +
        MIN_SEGMENT_HEIGHT;
    }
  });

  const adjustedTotalHeight = segments.reduce(
    (sum, segment) => sum + segment.height,
    0
  );

  if (adjustedTotalHeight > maxChartHeight) {
    const scalingFactor = maxChartHeight / adjustedTotalHeight;
    segments.forEach((segment) => {
      segment.height *= scalingFactor;
    });
  }

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
