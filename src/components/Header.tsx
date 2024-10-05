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
    <div className="min-h-screen flex flex-col">
      <nav className="w-full max-w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 mt-5">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          備蓄パーフェクトサイト
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="text"
                //value={userKeyword}
                //onChange={(e) => setUserKeyword(e.target.value)}
                className="border border-gray-300 p-2 rounded-l-lg h-8 w-64 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="検索キーワード..."
              />
              <button
                //onClick={searchProducts}
                className="bg-blue-500 text-white h-8 w-10 flex items-center justify-center rounded-r-lg hover:bg-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.414-1.414L21 21z"
                  />
                </svg>
              </button>
            </div>

            <ul className="flex items-center space-x-8">
              <li className="relative group">
                <a
                  href="#"
                  className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-crimson-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  商品
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </a>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    <li>
                      <a
                        href="https://search.rakuten.co.jp/search/mall/%E9%98%B2%E7%81%BD%E3%82%BB%E3%83%83%E3%83%88/?scid=あなたのアフィリエイトID"
                        target="_blank"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-900 hover:text-crimson-red dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        防災セット
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://search.rakuten.co.jp/search/mall/%E6%B0%B4/"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-900 hover:text-crimson-red dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        水
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://search.rakuten.co.jp/search/mall/%E9%9D%9E%E5%B8%B8%E9%A3%9F/"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-900 hover:text-crimson-red dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        食品
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a
                  href="#checklist"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-crimson-red md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  チェックリスト
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
// #endregion

export default Header;
