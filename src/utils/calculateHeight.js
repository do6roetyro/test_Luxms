export const calculateHeight = (value, maxValue, maxChartHeight) => {
    const logValue = Math.log10(value || 1);
    const logMax = Math.log10(maxValue || 1);
    return (logValue / logMax) * maxChartHeight;
  };