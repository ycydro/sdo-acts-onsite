import axios from "../cloudAxios";

export const rolesService = {
  getAll: async () => {
    const response = await axios.get("/role");
    return response.data;
  },
};
