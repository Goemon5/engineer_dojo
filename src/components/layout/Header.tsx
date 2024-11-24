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
      <nav className="w-full bg-white shadow-md dark:bg-gray-900 mt-5">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          {/* ロゴ部分 */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            エンジニア道場
          </Link>

          {/* ナビゲーションリンク (必要に応じて追加可能) */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-300"
            >
              About(未設定)
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-300"
            >
              Services(未設定)
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-300"
            >
              Contact(未設定)
            </Link>
          </div>

          {/* モバイル用メニュー (ハンバーガーメニューなど) */}
        </div>
      </nav>
    </div>
  );
};
// #endregion

export default Header;
