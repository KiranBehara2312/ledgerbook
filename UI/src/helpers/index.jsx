import moment from "moment";
import { toast } from "react-toastify";

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

const errorAlert = (
  message = "This is default message",
  options = { autoClose: 5000, pauseOnFocusLoss: true }
) =>
  toast.error(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });
const successAlert = (
  message = "This is default message",
  options = { autoClose: 5000, pauseOnFocusLoss: false }
) =>
  toast.success(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });
const infoAlert = (
  message = "This is default message",
  options = { autoClose: 5000, pauseOnFocusLoss: false }
) =>
  toast.info(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });
const warnAlert = (
  message = "This is default message",
  options = { autoClose: 5000, pauseOnFocusLoss: false }
) =>
  toast.warn(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });
const defaultAlert = (
  message = "This is default message",
  options = { autoClose: 5000, pauseOnFocusLoss: false }
) =>
  toast(message, {
    autoClose: options.autoClose,
    pauseOnFocusLoss: options.pauseOnFocusLoss,
  });

export {
  formatDate,
  setUserInfoInSStorage,
  getUserInfo,
  errorAlert,
  defaultAlert,
  warnAlert,
  successAlert,
  infoAlert,
};
