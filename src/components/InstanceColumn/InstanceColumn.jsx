import React from "react";
import style from "./InstanceColumn.module.css";
import { calculateHeight } from "../../utils/calculateHeight";
import { createSegments } from "../../utils/createSegments";
import { MIN_SEGMENT_HEIGHT } from "../../constants";

const InstanceColumn = ({
  label,
  instanceData,
  normValue,
  maxTotal,
  maxChartHeight,
}) => {
  if (normValue !== undefined) {
    let normHeightPx =
      calculateHeight(normValue, maxTotal, maxChartHeight) / 2.5;

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

  const segments = createSegments(instanceData, maxTotal, maxChartHeight);

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
