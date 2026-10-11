const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-base-200 shadow-sm">
      <div className="container mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-5 text-xs leading-relaxed text-gray-600 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-8">
        <p className="text-center md:text-left">
          বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-center md:max-w-md md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;