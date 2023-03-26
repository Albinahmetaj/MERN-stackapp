import axios from "axios";

export const BASE_URL = "http://localhost:4000/api/workouts/";

export const ENDPOINTS = {
  BRANDLIST: "workoutbrands",
};

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + endpoint;
  return {
    fetchAll: () =>
      axios.get(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(),
      }),
  };
};
