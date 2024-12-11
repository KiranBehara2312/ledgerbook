import { FaBed, FaDharmachakra, FaHome } from "react-icons/fa";
import { MdPersonAdd, MdCalendarMonth } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import IconWrapper from "../../components/custom/IconWrapper";

const MENU_ITEMS = [
  {
    label: "Home",
    icon: <IconWrapper icon={<FaHome size={20} />} />,
    url: "home",
  },
  {
    label: "New Registration",
    icon: <IconWrapper icon={<MdPersonAdd size={20} />} />,
    url: "registration",
  },
  {
    label: "Appointment",
    icon: <IconWrapper icon={<MdCalendarMonth size={20} />} />,
    url: "appointment",
  },
  {
    label: "Billing",
    icon: <IconWrapper icon={<SiCashapp size={20} />} />,
    url: "appointment",
  },
  {
    label: "Masters",
    icon: <IconWrapper icon={<FaDharmachakra size={20} />} />,
    url: "masters",
  },
];

export { MENU_ITEMS };
