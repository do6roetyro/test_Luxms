import React, { useEffect, useState } from 'react';
import Chart from './Chart';

const ChartsContainer = () => {
  const [groupedDatasets, setGroupedDatasets] = useState({});

  useEffect(() => {
    const urls = [
      "https://rcslabs.ru/ttrp1.json",
      "https://rcslabs.ru/ttrp2.json",
      "https://rcslabs.ru/ttrp3.json",
      "https://rcslabs.ru/ttrp4.json",
      "https://rcslabs.ru/ttrp5.json",
    ];

    const fetchAllData = async () => {
      try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((res) => res.json()));

        // Группируем данные
        const groups = {};
        data.forEach((item) => {
          const devTotal = item.dev.front + item.dev.back + item.dev.db;
          const testTotal = item.test.front + item.test.back + item.test.db;
          const prodTotal = item.prod.front + item.prod.back + item.prod.db;
          const norm = item.norm || 0;
          const localMax = Math.max(devTotal, testTotal, prodTotal, norm);

          let groupKey;
          if (localMax <= 1000) {
            groupKey = 'small';
          } else if (localMax <= 100000) {
            groupKey = 'medium';
          } else {
            groupKey = 'large';
          }

          if (!groups[groupKey]) {
            groups[groupKey] = { datasets: [], maxTotal: 0 };
          }

          groups[groupKey].datasets.push(item);
          groups[groupKey].maxTotal = Math.max(groups[groupKey].maxTotal, localMax);
        });

        setGroupedDatasets(groups);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchAllData();
  }, []);

  if (Object.keys(groupedDatasets).length === 0) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div>
      {Object.entries(groupedDatasets).map(([groupKey, group]) => (
        <div key={groupKey}>
          <h2>Группа: {groupKey}</h2>
          {group.datasets.map((data, index) => (
            <Chart
              key={index}
              data={data}
              globalMaxTotal={group.maxTotal}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChartsContainer;