import api from "../api/axios";


// Get all active stocks
export const getStocks = async () => {

  const response = await api.get(
    "/stocks"
  );

  return response.data;
};


// Get single stock details
export const getStockById = async (id) => {

  const response = await api.get(
    `/stocks/${id}`
  );

  return response.data;
};