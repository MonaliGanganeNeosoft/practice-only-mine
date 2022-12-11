import axios from "axios";
import { MAIN_URL } from "./Url";
export function addNewProjectService(data) {
  return axios.post(`${MAIN_URL}project/addNewprojectService`, data);
}
export function fetchprojectService() {
  return axios.get(`${MAIN_URL}project/fetchAllprojectService`);
}
