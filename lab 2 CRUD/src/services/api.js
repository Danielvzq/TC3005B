import axios from "axios";

const API_URL = "http://localhost:5000/api/countries";

export const getCountries = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createCountry = async (country) => {
  const res = await axios.post(API_URL, country);
  return res.data;
};

export const deleteCountry = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const updateCountry = async (id, country) => {
  const res = await axios.put(`${API_URL}/${id}`, country);
  return res.data;
};
