import React from "react";

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
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          エンジニア道場
          <div className="flex items-center space-x-4"></div>
        </div>
      </nav>
    </div>
  );
};
// #endregion

export default Header;
