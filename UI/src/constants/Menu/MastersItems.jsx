import { FaHandshake } from "react-icons/fa";
import IconWrapper from "../../components/custom/IconWrapper";
import { IoMaleFemale } from "react-icons/io5";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { VscTypeHierarchy } from "react-icons/vsc";
import { MdBloodtype } from "react-icons/md";

const MASTERS_ITEMS = [
  {
    label: "Salutation",
    collection: "salutations",
    icon: <IconWrapper icon={<FaHandshake size={25} />} />,
    category: null,
  },
  {
    label: "Gender",
    collection: "genders",
    icon: <IconWrapper icon={<IoMaleFemale size={25} />} />,
    category: null,
  },
  {
    label: "State",
    collection: "states",
    icon: <IconWrapper icon={<HiMiniBuildingLibrary size={25} />} />,
    category: null,
  },
  {
    label: "Country",
    collection: "countries",
    icon: <IconWrapper icon={<BsGlobeCentralSouthAsia size={25} />} />,
    category: null,
  },
  {
    label: "Patient Type",
    collection: "patientTypes",
    icon: <IconWrapper icon={<VscTypeHierarchy size={25} />} />,
    category: null,
  },
  {
    label: "Blood Groups",
    collection: "bloodGroups",
    icon: <IconWrapper icon={<MdBloodtype size={25} />} />,
    category: null,
  },
];

export { MASTERS_ITEMS };
