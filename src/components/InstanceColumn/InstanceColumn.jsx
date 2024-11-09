import React from "react";
import style from "./InstanceColumn.module.css";

const InstanceColumn = ({ label, instanceData, normValue }) => {
  // Вычисляем высоту каждого компонента, если это не норматив
  const frontHeight = instanceData ? instanceData.front : 0;
  const backHeight = instanceData ? instanceData.back : 0;
  const dbHeight = instanceData ? instanceData.db : 0;
  const totalHeight = frontHeight + backHeight + dbHeight;

  return (
    <div className={style.instance_column}>
      <div className={style.column}>
        {normValue ? (
          <div className={style.norm} style={{ height: `${normValue}%` }}>
            <span>{normValue}</span>
          </div>
        ) : (
          <>
            <div
              className={`${style.segment} ${style.front}`}
              style={{ height: `${(frontHeight / totalHeight) * 100}%` }}
            >
              <span>{frontHeight}</span>
            </div>
            <div
              className={`${style.segment} ${style.back}`}
              style={{ height: `${(backHeight / totalHeight) * 100}%` }}
            >
              <span>{backHeight}</span>
            </div>
            <div
              className={`${style.segment} ${style.db}`}
              style={{ height: `${(dbHeight / totalHeight) * 100}%` }}
            >
              <span>{dbHeight}</span>
            </div>
          </>
        )}
      </div>
      <div className={style.label}>{label}</div>
    </div>
  );
};

export default InstanceColumn;
