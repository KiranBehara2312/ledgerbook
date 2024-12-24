import { FaBed, FaDharmachakra, FaHome, FaUsers } from "react-icons/fa";
import { MdPersonAdd, MdCalendarMonth } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";
import { ADMIN, DOCTOR, NURSE, STAFF } from "../roles";

const MENU_ITEMS = [
  {
    label: "Home",
    icon: <FaHome size={20} />,
    url: "home",
    access: [ADMIN, DOCTOR, NURSE, STAFF],
  },
  {
    label: "New Registration",
    icon: <MdPersonAdd size={20} />,
    url: "registration",
    access: [ADMIN, STAFF],
  },
  {
    label: "Appointment",
    icon: <MdCalendarMonth size={20} />,
    url: "appointment",
    access: [ADMIN, STAFF],
  },
  {
    label: "Payment Ledger",
    icon: <SiCashapp size={20} />,
    url: "paymentLedger",
    access: [ADMIN, STAFF],
  },
  {
    label: "Doctor",
    icon: <FaUserDoctor size={20} />,
    url: "doctor",
    access: [ADMIN, STAFF],
  },
  {
    label: "Patients",
    icon: <FaUsers size={20} />,
    url: "patients",
    access: [ADMIN, NURSE, STAFF, DOCTOR],
  },
  {
    label: "Masters",
    icon: <FaDharmachakra size={20} />,
    url: "masters",
    access: [ADMIN],
  },
];

export { MENU_ITEMS };
