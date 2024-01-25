import {
  AiFillHome,
  AiFillFileText,
  AiFillCalculator,
  AiFillMessage,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";

const NavList = (props) => {
  const { isScrolled } = props;

  return (
    <ul className={`text-base ${isScrolled ? "text-gray-500" : "text-gray-100"} mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6`}>
      <li
        className={`hover:text-teal-400 font-semibold text-md text-grey-500`}
      >
        <button className="flex gap-2 items-center">
          <AiFillHome className="menu text-lg" />
          <NavLink to="/">Home</NavLink>
        </button>
      </li>
      <li className={`hover:text-teal-400 font-semibold text-md`}>
        <button className="flex items-center gap-2">
          <AiFillFileText className="menu text-lg" />
          <NavLink to="/article">Artikel</NavLink>
        </button>
      </li>
      <li className={`hover:text-teal-400 font-semibold text-md`}>
        <button className="flex items-center gap-2">
          <AiFillCalculator className="menu text-lg" />
          <NavLink to="/bmi">Status Gizi</NavLink>
        </button>
      </li>
      <li className={`hover:text-teal-400 font-semibold text-md`}>
        <button className="flex items-center gap-2">
          <AiFillMessage className="text-lg" />
          <NavLink to="/forum">Forum Diskusi</NavLink>
        </button>
      </li>
      <li className={`hover:text-teal-400 font-semibold text-md`}>
        <button className="flex items-center gap-2">
          <BsPersonFillAdd className="text-lg" />
          <NavLink to="/consult">Konsultasi</NavLink>
        </button>
      </li>
    </ul>
  );
};

export default NavList;