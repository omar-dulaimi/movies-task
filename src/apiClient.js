import axios from "axios";

export default axios.create({
  baseURL: `https://movie-task.vercel.app/api`,
});
