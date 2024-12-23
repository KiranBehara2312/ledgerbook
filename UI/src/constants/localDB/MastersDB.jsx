const GENDER_LIST = [
  {
    label: "Male",
    shortName: "M",
    value: "Male",
  },
  {
    label: "Female",
    shortName: "F",
    value: "Female",
  },
  {
    label: "Others",
    shortName: "O",
    value: "Others",
  },
];
const MARITAL_STATUS = [
  {
    label: "Single",
    value: "Single",
  },
  {
    label: "Married",
    value: "Married",
  },
  {
    label: "Widowed",
    value: "Widowed",
  },
  {
    label: "Divorced",
    value: "Divorced",
  },
];
const BLOOD_GROUPS = [
  {
    shortName: "A+",
    label: "A Positive",
    value: "A Positive",
  },
  {
    shortName: "A-",
    label: "A Negative",
    value: "A Negative",
  },
  {
    shortName: "B+",
    label: "B Positive",
    value: "B Positive",
  },
  {
    shortName: "B-",
    label: "B Negative",
    value: "B Negative",
  },
  {
    shortName: "O+",
    label: "O Positive",
    value: "O Positive",
  },
  {
    shortName: "O-",
    label: "O Negative",
    value: "O Negative",
  },
  {
    shortName: "AB+",
    label: "AB Positive",
    value: "AB Positive",
  },
  {
    shortName: "AB-",
    label: "AB Negative",
    value: "AB Negative",
  },
];

const WEEK_DAYS_LIST = [
  {
    label: "Monday",
    value: "Monday",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
  },
  {
    label: "Thursday",
    value: "Thursday",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Saturday",
    value: "Saturday",
  },
  {
    label: "Sunday",
    value: "Sunday",
  },
];

const DOCTOR_DESIGNATIONS = [
  { label: "Cardiologist", value: "Cardiologist" },
  { label: "Neurologist", value: "Neurologist" },
  { label: "Dermatologist", value: "Dermatologist" },
  { label: "Endocrinologist", value: "Endocrinologist" },
  { label: "Obstetrician-gynecologist", value: "Obstetrician-gynecologist" },
  { label: "Oncologist", value: "Oncologist" },
  { label: "Pediatrician", value: "Pediatrician" },
  { label: "Allergist", value: "Allergist" },
  { label: "Psychiatrist", value: "Psychiatrist" },
  { label: "Family medicine", value: "Family medicine" },
  { label: "Gastroenterologist", value: "Gastroenterologist" },
  { label: "Internal medicine", value: "Internal medicine" },
  { label: "Ophthalmologist", value: "Ophthalmologist" },
  { label: "Radiologist", value: "Radiologist" },
  { label: "Anesthesiologist", value: "Anesthesiologist" },
  { label: "Otolaryngologist", value: "Otolaryngologist" },
  { label: "Cardiothoracic Surgeon", value: "Cardiothoracic Surgeon" },
  { label: "Hematologist", value: "Hematologist" },
  { label: "Nephrologist", value: "Nephrologist" },
  { label: "Pulmonologist", value: "Pulmonologist" },
  { label: "Geriatrics", value: "Geriatrics" },
  {
    label: "Infectious disease physician",
    value: "Infectious disease physician",
  },
  { label: "Medical genetics", value: "Medical genetics" },
  { label: "Orthopaedist", value: "Orthopaedist" },
];
const DAILY_SHIFT = [
  { label: "Shift A (6AM - 2PM)", value: "Shift A" },
  { label: "Shift B (2PM - 10PM)", value: "Shift B" },
  { label: "Shift C (10PM - 6AM)", value: "Shift C" },
];

const PAYMENT_TYPES = [
  {
    label: "Cash",
    value: "Cash",
  },
  {
    label: "UPI",
    value: "UPI",
  },
  // {
  //   label: "Coupon",
  //   value: "Coupon",
  // },
];

const SALUTATIONS = [
  {
    label: "Mr.",
    value: "Mr.",
  },
  {
    label: "Mrs.",
    value: "Mrs.",
  },
  {
    label: "Master.",
    value: "Master.",
  },
  {
    label: "Ms.",
    value: "Ms.",
  },
  {
    label: "Dr.",
    value: "Dr.",
  },
];

const PATIENT_TYPES = [
  {
    label: "Out patient",
    value: "Out Patient",
    shortName: "OPD",
  },
  {
    label: "In patient",
    value: "In Patient",
    shortName: "IP",
  },
  {
    label: "Emergency",
    value: "Emergency",
    shortName: "ER",
  },
];

const APP_USER_TYPES = [
  {
    label: "ADMIN",
    value: "ADMIN",
    description: "",
  },
  {
    label: "DOCTOR",
    value: "DOCTOR",
    description: "",
  },
  {
    label: "NURSE",
    value: "NURSE",
    description: "",
  },
  {
    label: "STAFF",
    value: "STAFF",
    description: "",
  },
  {
    label: "PATIENT",
    value: "PATIENT",
    description: "",
  },
];

const REGISTRATION_TYPES = [
  {
    label: "New",
    value: "New",
  },
  {
    label: "Renewal",
    value: "Renewal",
  },
];
const VISIT_TYPES = [
  {
    label: "New Case",
    value: "New Case",
  },
  {
    label: "Follow-up",
    value: "Follow-up",
  },
  {
    label: "Lab",
    value: "Lab",
  },
];

const PAYMENT_STATUSES = [
  {
    label: "Success",
    value: "Success",
  },
  {
    label: "Failure",
    value: "Failure",
  },
  {
    label: "Pending",
    value: "Pending",
  },
];

export {
  GENDER_LIST,
  BLOOD_GROUPS,
  MARITAL_STATUS,
  WEEK_DAYS_LIST,
  DOCTOR_DESIGNATIONS,
  DAILY_SHIFT,
  SALUTATIONS,
  PAYMENT_TYPES,
  PATIENT_TYPES,
  REGISTRATION_TYPES,
  VISIT_TYPES,
  PAYMENT_STATUSES,
  APP_USER_TYPES,
};
