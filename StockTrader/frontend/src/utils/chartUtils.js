export const generateChartData = (
  basePrice,
  volatility = 0.05,
  points = 30
) => {
  let currentPrice = basePrice;
  const data = [];

  for (let i = 0; i < points; i++) {
    const change = currentPrice * volatility * (Math.random() - 0.5);

    currentPrice += change;

    data.push({
      time: `Day ${i + 1}`,
      price: Number(currentPrice.toFixed(2)),
    });
  }

  return data;
};