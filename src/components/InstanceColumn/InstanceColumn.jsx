// InstanceColumn.js
import React from "react";
import style from "./InstanceColumn.module.css";

const InstanceColumn = ({
  label,
  instanceData,
  normValue,
  maxTotal,
  maxChartHeight,
}) => {

  const MIN_SEGMENT_HEIGHT = 32; // Минимальная высота сегмента в пикселях

  if (normValue !== undefined) {
    // Вычисляем высоту нормативного столбика
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

  // Значения сегментов
  const frontValue = instanceData.front;
  const backValue = instanceData.back;
  const dbValue = instanceData.db;

  // Суммарное значение для текущего инстанса
  const instanceTotal = frontValue + backValue + dbValue;

  // Вычисляем исходные пропорциональные высоты сегментов
  const totalHeightPx = (instanceTotal / maxTotal) * maxChartHeight;
  let frontHeightPx = (frontValue / instanceTotal) * totalHeightPx;
  let backHeightPx = (backValue / instanceTotal) * totalHeightPx;
  let dbHeightPx = (dbValue / instanceTotal) * totalHeightPx;

  // Собираем сегменты в массив для удобства обработки
  let segments = [
    { name: "front", value: frontValue, height: frontHeightPx },
    { name: "back", value: backValue, height: backHeightPx },
    { name: "db", value: dbValue, height: dbHeightPx },
  ];

  // Обрабатываем сегменты, устанавливая минимальную высоту для нулевых и малых значений
  let totalMinHeights = 0;
  segments.forEach((segment) => {
    if (segment.height < MIN_SEGMENT_HEIGHT || segment.value === 0) {
      totalMinHeights += MIN_SEGMENT_HEIGHT;
      segment.height = MIN_SEGMENT_HEIGHT;
    }
  });

  // Вычисляем оставшуюся высоту для распределения между сегментами, превышающими минимальную высоту
  const remainingHeightPx = totalHeightPx - totalMinHeights;

  // Сумма исходных высот сегментов, превышающих минимальную высоту
  const totalOriginalHeights = segments.reduce((sum, segment) => {
    if (segment.height > MIN_SEGMENT_HEIGHT) {
      return sum + segment.height;
    }
    return sum;
  }, 0);

  // Корректируем высоты сегментов, превышающих минимальную высоту
  segments.forEach((segment) => {
    if (segment.height > MIN_SEGMENT_HEIGHT) {
      segment.height =
        (segment.height / totalOriginalHeights) * remainingHeightPx +
        MIN_SEGMENT_HEIGHT;
    }
  });

  // Проверяем, не превышает ли общая высота максимальную высоту столбика
  const adjustedTotalHeight = segments.reduce(
    (sum, segment) => sum + segment.height,
    0
  );

  if (adjustedTotalHeight > maxChartHeight) {
    // Применяем коэффициент масштабирования
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
