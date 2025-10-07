import { findAll, findById, create } from "../repositories/hongos.js";


export const getHongos = async () => {
  const hongos = await findAll();
  return hongos;
}

export const getHongoById = async (id) => {
  const hongo = await findById(id);
  return hongo;
}

export const createHongo = async (hongo) => {
  const id = await create(hongo);
  return id;
}