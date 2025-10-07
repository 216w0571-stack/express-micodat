import axios from "axios";
import { API_URL } from "../config.js"; // ruta según tu estructura
import { findAll } from "../repositories/hongos.js";
export const getHongos = async () => {
  const hongos = await findAll();
  return hongos;
}


export const getHongo = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/hongos/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error al obtener hongo:", err);
  }
};