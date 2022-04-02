import axios from "axios";
import { variables } from "./config/variables";

export default axios.create({
  baseURL: variables.apiBaseUrl,
});
