import api from "../api/axios";


// Get current user's portfolio
export const getPortfolio = async () => {

  const response = await api.get(
    "/portfolio"
  );

  return response.data;
};