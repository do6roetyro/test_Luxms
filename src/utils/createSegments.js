import { calculateHeight } from './calculateHeight';
import { MIN_SEGMENT_HEIGHT } from '../constants';

export const createSegments = (instanceData, maxTotal, maxChartHeight) => {
  let frontHeightPx = calculateHeight(instanceData.front, maxTotal, maxChartHeight) / 2.5;
  let backHeightPx = calculateHeight(instanceData.back, maxTotal, maxChartHeight) / 2.5;
  let dbHeightPx = calculateHeight(instanceData.db, maxTotal, maxChartHeight) / 2.5;

  let segments = [
    { name: "front", value: instanceData.front, height: frontHeightPx },
    { name: "back", value: instanceData.back, height: backHeightPx },
    { name: "db", value: instanceData.db, height: dbHeightPx },
  ];

  segments.forEach((segment) => {
    if (segment.height < MIN_SEGMENT_HEIGHT || segment.value === 0) {
      segment.height = MIN_SEGMENT_HEIGHT;
    }
  });

  return segments;
};