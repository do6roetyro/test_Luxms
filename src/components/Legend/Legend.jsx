import React from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../../reducers/dataSlice";
import style from "./Legend.module.css";

const Legend = () => {
  const items = useSelector(selectItems);

  return (
    <div className={style.legend}>
      {items.map((item, index) => (
        <div key={index} className={style.legendItem}>
          <span
            className={style.colorBox}
            style={{ backgroundColor: item.color }}
          ></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
