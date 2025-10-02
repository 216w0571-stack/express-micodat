import { query } from "../db/index.js";
import { getHongos as getHongosService } from "../services/hongos.js";

export const getHongos = async () => {
  const hongos = await getHongosService();
  return hongos;
};