import React from "react";
import { ReactComponent as VectorIcon } from "../../assets/icons/vector.svg";
import style from "./DifferenceInfo.module.css";

const DifferenceInfo = ({ difference, index }) => {
  console.log(style);

  let containerClassName;
  let arrowClassName;
  let text;

  if (difference > 0) {
    containerClassName = `${style.diff} ${style.diff_up}`;
    arrowClassName = `${style.icon} ${style.up}`;
    text = `+${difference}`;
  } else if (difference < 0) {
    containerClassName = `${style.diff} ${style.diff_down}`;
    arrowClassName = `${style.icon} ${style.down}`;
    text = `${difference}`;
  } else {
    containerClassName = `${style.diff} ${style.diff_neutral}`;
    text = "0";
  }

  const indexClass = index === 1 ? style.firstContainer : style.secondContainer;
  containerClassName += ` ${indexClass}`;

  return (
    <div className={containerClassName}>
      {difference !== 0 && <VectorIcon className={arrowClassName} />}
      <span>{text}</span>
    </div>
  );
};

export default DifferenceInfo;
