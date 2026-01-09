import axios from "../cloudAxios";

export const authService = {
  login: async ({ email, password }) => {
    const response = await axios.post("/auth/login", { email, password });
    return response.data;
  },
};
