import moment from "moment";
import { S_USER_INFORMATION } from "../constants/sessionStorageKeys";

const formatDate = (formatStr = "dd/MM/yyyy", date = new Date()) => {
  return moment(date).format(formatStr);
};

const setUserInfoInSStorage = (userObj) => {
  sessionStorage.setItem(S_USER_INFORMATION, JSON.stringify(userObj));
};

const getUserInfo = () => {
  return JSON.parse(sessionStorage.getItem(S_USER_INFORMATION));
};

export { formatDate, setUserInfoInSStorage, getUserInfo };
