import axios from "axios";

const baseUrl = process.env.baseUrl || "http://localhost:3000";

export const apiClient = axios.create({
     baseURL: baseUrl,
     headers: {
          "Content-Type": "application/json",
     },
});

export const floodService = {
     // GET flood prediction berdasarkan latitude dan longitude
     getPrediction: async (latitude: number, longitude: number) => {
          try {
               const response = await apiClient.get(`/api/predict-flood`, {
                    params: {
                         latitude,
                         longitude,
                    },
               });
               return response.data;
          } catch (error) {
               if (axios.isAxiosError(error)) {
                    throw new Error(error.response?.data?.error || "Failed to fetch flood prediction");
               }
               throw error;
          }
     },
};

