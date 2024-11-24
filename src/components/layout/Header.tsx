import React from "react";
import Link from "next/link";

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
interface HeaderProps {}

/**
 *
 */
const Header = ({}: HeaderProps): JSX.Element => {
  return (
    <div>
      <nav className="w-full max-w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 mt-5">
        <Link
          href="/Roadmap"
          className="max-w-screen-xl flex items-center justify-between mx-auto p-4"
        >
          エンジニア道場
        </Link>
      </nav>
    </div>
  );
};
// #endregion

export default Header;
