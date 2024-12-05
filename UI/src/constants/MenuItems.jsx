import { FaHome } from "react-icons/fa";
import { MdPersonAdd, MdCalendarMonth } from "react-icons/md";

const MENU_ITEMS = [
  {
    label: "Home",
    icon: <FaHome size={20}/>,
    url: "home",
  },
  {
    label: "New Registration",
    icon: <MdPersonAdd size={20}/>,
    url: "registration",
  },
  {
    label: "Appointment",
    icon: <MdCalendarMonth size={20}/>,
    url: "appointment",
  },
];

export { MENU_ITEMS };
