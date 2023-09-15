/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex mb-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== items.length - 1 ? (
              <>
                <NavLink
                  to={item.url}
                  className="text-teal-600 font-semibold text-sm sm:text-base"
                >
                  {item.title}
                </NavLink>
                <svg
                  className="h-3 w-3 text-gray-500 mx-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            ) : (
              <span className="text-gray-500 text-sm sm:text-base line-clamp-1">
                {item.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
