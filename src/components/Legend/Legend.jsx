import React from "react";
import style from './Legend.module.css';

const Legend = () => {
  const items = [
    { color: "#4AB6E8", label: "Клиентская часть" },
    { color: "#AA6FAC", label: "Серверная часть" },
    { color: "#E85498", label: "База данных" },
  ];

  return (
    <div className={style.legend}>
      {items.map((item, index) => (
        <div key={index} className={style.legendItem}>
          <span className={style.colorBox} style={{ backgroundColor: item.color }}></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;