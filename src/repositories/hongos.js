import { query } from "../db/index.js";
export const findAll = async () => {
  const hongos = await query("SELECT * FROM hongos");
  return hongos;
};