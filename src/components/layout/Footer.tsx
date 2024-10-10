import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-7">
        <a
          href="https://www.rakuten.co.jp/"
          className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
        >
          © 2023 Example Inc. All Rights Reserved.
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm font-normal sm:mb-0 dark:text-gray-400">
          <li>
            <a
              href="https://corp.rakuten.co.jp/about/"
              className="text-gray-600 hover:underline hover:text-crimson-red me-4 md:me-6"
            >
              サービスについて
            </a>
          </li>
          <li></li>
          <li>
            <a
              href="https://ichiba.faq.rakuten.net/"
              className="text-gray-600 hover:underline hover:text-crimson-red"
            >
              お問い合わせ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
