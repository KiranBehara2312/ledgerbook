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
    isActive: true,
  },
  {
    label: "Married",
    value: "Married",
    isActive: true,
  },
  {
    label: "Widowed",
    value: "Widowed",
    isActive: true,
  },
  {
    label: "Divorced",
    value: "Divorced",
    isActive: true,
  },
];
const BLOOD_GROUPS = [
  {
    shortName: "A+",
    label: "A Positive",
    value: "A Positive",
    isActive: true,
  },
  {
    shortName: "A-",
    label: "A Negative",
    value: "A Negative",
    isActive: true,
  },
  {
    shortName: "B+",
    label: "B Positive",
    value: "B Positive",
    isActive: true,
  },
  {
    shortName: "B-",
    label: "B Negative",
    value: "B Negative",
    isActive: true,
  },
  {
    shortName: "O+",
    label: "O Positive",
    value: "O Positive",
    isActive: true,
  },
  {
    shortName: "O-",
    label: "O Negative",
    value: "O Negative",
    isActive: true,
  },
  {
    shortName: "AB+",
    label: "AB Positive",
    value: "AB Positive",
    isActive: true,
  },
  {
    shortName: "AB-",
    label: "AB Negative",
    value: "AB Negative",
    isActive: true,
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

const SALUTATIONS = [
  {
    label: "Mr.",
    value: "Mr.",
    isActive: true,
  },
  {
    label: "Mrs.",
    value: "Mrs.",
    isActive: true,
  },
  {
    label: "Master.",
    value: "Master.",
    isActive: true,
  },
  {
    label: "Ms.",
    value: "Ms.",
    isActive: true,
  },
  {
    label: "Dr.",
    value: "Dr.",
    isActive: true,
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
};
