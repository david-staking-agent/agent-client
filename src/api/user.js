import http from "./http";

const apiEndpoint = `${import.meta.env.VITE_API_URL}/user`;

export const getRecommendedTrades = async (username) => {
  return (await http.get(`${apiEndpoint}/${username}/trades/recommended`)).data;
};

export const getCompletedTrades = async (username) => {
  return (await http.get(`${apiEndpoint}/${username}/trades/completed`)).data;
};

// Unused
export const getUserWallet = async (username) => {
  return (await http.get(`${apiEndpoint}/${username}/wallet`)).data;
};

export const updateUserWallet = async (username, chatId, walletAddress) => {
  return (
    await http.post(`${apiEndpoint}/${username}/wallet`, {
      chatId,
      walletAddress,
    })
  ).data;
};

export const updateUserCompletedTrades = async (username, chatId, trade) => {
  return http.post(`${apiEndpoint}/${username}/trades/completed`, {
    chatId,
    trade,
  });
};
