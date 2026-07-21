import api from "../api/axios";


// Buy stock
export const buyStockAPI = async (stockId, quantity) => {

  const response = await api.post(
    "/trades/buy",
    {
      stockId,
      quantity,
    }
  );

  return response.data;
};


// Sell stock
export const sellStockAPI = async (stockId, quantity) => {

  const response = await api.post(
    "/trades/sell",
    {
      stockId,
      quantity,
    }
  );

  return response.data;
};