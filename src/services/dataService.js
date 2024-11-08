const urls = [
  "https://rcslabs.ru/ttrp1.json",
  "https://rcslabs.ru/ttrp2.json",
  "https://rcslabs.ru/ttrp3.json",
  "https://rcslabs.ru/ttrp4.json",
  "https://rcslabs.ru/ttrp5.json",
];

// Функция для загрузки данных по индексу
export const fetchDataByIndex = async (index) => {
  try {
    const response = await fetch(urls[index]);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
