import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Arrow.css';

const Arrow = ({ difference }) => {
  let color, icon, text;

  if (difference > 0) {
    color = '#00CC99'; // Зеленый для увеличения
    icon = <ArrowDropUpIcon />;
    text = `+${difference}`;
  } else if (difference < 0) {
    color = '#FC440F'; // Красный для уменьшения
    icon = <ArrowDropDownIcon />;
    text = `${difference}`;
  } else {
    color = '#898290'; // Серый для отсутствия изменений
    icon = null;
    text = '0';
  }

  return (
    <div className="arrow" style={{ color }}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default Arrow;