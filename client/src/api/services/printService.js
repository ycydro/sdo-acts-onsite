import localAxios from "../localAxios";

export const printService = {
  printTicket: async (ticketData) => {
    const response = await localAxios.post("/print", ticketData);
    return response.data;
  },
};
