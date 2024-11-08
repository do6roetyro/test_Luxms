import React from "react";

const InstanceColumn = ({ label, instanceData, normValue }) => {
  // Вычисляем высоту каждого компонента, если это не норматив
  const frontHeight = instanceData ? instanceData.front : 0;
  const backHeight = instanceData ? instanceData.back : 0;
  const dbHeight = instanceData ? instanceData.db : 0;
  const totalHeight = frontHeight + backHeight + dbHeight;

  return (
    <div className="instance-column">
      <div className="column">
        {normValue ? (
          <div className="norm" style={{ height: `${normValue}%` }}>
            <span>{normValue}</span>
          </div>
        ) : (
          <>
            <div
              className="segment front"
              style={{ height: `${(frontHeight / totalHeight) * 100}%` }}
            >
              <span>{frontHeight}</span>
            </div>
            <div
              className="segment back"
              style={{ height: `${(backHeight / totalHeight) * 100}%` }}
            >
              <span>{backHeight}</span>
            </div>
            <div
              className="segment db"
              style={{ height: `${(dbHeight / totalHeight) * 100}%` }}
            >
              <span>{dbHeight}</span>
            </div>
          </>
        )}
      </div>
      <div className="label">{label}</div>
    </div>
  );
};

export default InstanceColumn;
