import { findAll } from "../repositories/hongos.js";
export const getHongos = async () => {
  const hongos = await findAll();
  return hongos;
}