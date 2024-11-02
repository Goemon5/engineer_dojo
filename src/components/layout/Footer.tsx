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
          © 2024 Example Inc. All Rights Reserved.
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm font-normal sm:mb-0 dark:text-gray-400">
          <li>サービスについて</li>
          <li></li>
          <li>お問い合わせ</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
