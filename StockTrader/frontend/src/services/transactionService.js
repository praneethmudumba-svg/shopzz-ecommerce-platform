import api from "../api/axios";


// Get all transactions of current user
export const getTransactions = async () => {

  const response = await api.get(
    "/trades/transactions"
  );

  return response.data;
};