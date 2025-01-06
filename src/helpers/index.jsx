import moment from "moment";
import { toast } from "react-toastify";

import { S_USER_INFORMATION } from "../constants/sessionStorageKeys";

const formatDate = (formatStr = "dd/MM/yyyy", date = new Date()) => {
  return moment(date).format(formatStr);
};

const calculateAge = (birthDate = new Date()) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  if (months < 0) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days += lastMonth.getDate();
  }
  return {
    years: years,
    months: months,
    days: days,
    string: `${years}y ${months}m ${days}d`,
  };
};

const convertMongoDBDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};

const camelToTitle = (camelCaseString) => {
  // Add a space before each uppercase letter and capitalize the first letter of each word
  const titleCaseString = camelCaseString
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return titleCaseString;
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

const formatIndianCurrency = (amount) => {
  let num = amount.toString();
  if (num?.length <= 3) return "₹" + num;
  let lastThree = num.slice(-3);
  let otherNumbers = num.slice(0, num.length - 3);

  otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

  return "₹" + otherNumbers + "," + lastThree;
};

const csvToJson = (splitter, csv) => {
  const lines = csv.split("\n");
  const headers = lines[0].split(splitter); // The first line contains the headers
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(splitter);

    if (currentLine.length === 1 && currentLine[0] === "") continue;

    headers.forEach((header, index) => {
      obj[header.trim()] = currentLine[index]?.trim();
    });

    result.push(obj);
  }

  return result;
};

const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const teens = [
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const tens = [
  "",
  "ten",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
const thousands = ["", "thousand", "lakh", "crore"];

function numberToWords(num = "0") {
  if (num === "0") return "zero";

  let numStr = num.toString();
  let word = "";
  let n = numStr.length;

  if (n > 9) return "overflow"; // number out of bounds

  // Pad the number with leading zeros for easier parsing
  numStr = numStr.padStart(9, "0");

  // Split the number into groups of two
  let crore = numStr.slice(0, 2);
  let lakh = numStr.slice(2, 4);
  let thousand = numStr.slice(4, 6);
  let hundred = numStr[6];
  let ten = numStr.slice(7);

  if (parseInt(crore) > 0) {
    word += `${convertTwoDigits(crore)} crore `;
  }
  if (parseInt(lakh) > 0) {
    word += `${convertTwoDigits(lakh)} lakh `;
  }
  if (parseInt(thousand) > 0) {
    word += `${convertTwoDigits(thousand)} thousand `;
  }
  if (parseInt(hundred) > 0) {
    word += `${ones[hundred]} hundred `;
  }
  if (parseInt(ten) > 0) {
    word += convertTwoDigits(ten);
  }

  return word.trim();
}

function convertTwoDigits(num) {
  num = parseInt(num, 10);
  if (num < 10) return ones[num];
  if (num > 10 && num < 20) return teens[num - 11];
  let unit = num % 10;
  let ten = Math.floor(num / 10);
  return `${tens[ten]} ${ones[unit]}`.trim();
}

function convertRupeesPaise(amount) {
  let [rupees, paise] = amount.toString().split(".");

  let rupeesInWords = numberToWords(parseInt(rupees));
  let paiseInWords = paise ? convertTwoDigits(paise.padEnd(2, "0")) : "";

  let result = "";
  if (rupeesInWords) {
    result += `${rupeesInWords} rupees`;
  }
  if (paiseInWords) {
    result += ` and ${paiseInWords} paise`;
  }

  return result.trim();
}

function base64ToBlobUrl(base64String) {
  console.log(base64String);
  if (base64String == null || base64String === "") return;
  const mimeType = base64String.split(",")[0]?.split(":")[1].split(";")[0];
  const base64Exact = base64String.split(",")[1];
  let cleanedBase64 = base64Exact.replace(/\s/g, ""); // Remove whitespace
  cleanedBase64 = cleanedBase64.replace(/-/g, "+").replace(/_/g, "/");
  // Step 2: Ensure proper padding for Base64 string (if necessary)
  const padding = cleanedBase64.length % 4;
  if (padding) {
    cleanedBase64 += "=".repeat(4 - padding); // Add padding if the length isn't a multiple of 4
  }
  const byteCharacters = atob(cleanedBase64);
  const byteArrays = [];
  const length = byteCharacters.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = byteCharacters.charCodeAt(i);
  }

  for (let offset = 0; offset < byteCharacters.length; offset++) {
    const byteArray = new Uint8Array(1);
    byteArray[0] = byteCharacters.charCodeAt(offset);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(bytes, { type: mimeType });

  const blobUrl = URL.createObjectURL(blob);

  return blobUrl;
}

export {
  formatDate,
  setUserInfoInSStorage,
  getUserInfo,
  errorAlert,
  defaultAlert,
  warnAlert,
  successAlert,
  infoAlert,
  camelToTitle,
  convertMongoDBDate,
  calculateAge,
  formatIndianCurrency,
  csvToJson,
  numberToWords,
  base64ToBlobUrl,
};
