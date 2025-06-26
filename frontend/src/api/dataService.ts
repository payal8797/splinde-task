import axios from "axios";
import type { Section } from "../types";

export const fetchSectionData = async (): Promise<Section> => {
  const res = await axios.get<Section>("http://localhost:3001/api/data");
  return res.data;
};
