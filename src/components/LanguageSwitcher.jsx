import { useTranslation } from 'react-i18next';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import LanguageIcon from '../assets/icons/LanguageIcon';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="bg-[#025043] p-2 flex items-center gap-1 cursor-pointer rounded-full hover:bg-[#507771] transition-all duration-200">
          <LanguageIcon className="w-4 h-4 text-white" />
        </button>
      </DropdownTrigger>

      <DropdownMenu
        className="bg-white text-[#025043] rounded-xl w-32 font-[Expo-arabic] p-1 "
        aria-label="Language Actions"
      >
        <DropdownItem
          key="en"
          onClick={() => changeLanguage('en')}
          className="hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 py-1">
            <img
              src="https://flagcdn.com/w20/gb.png"
              alt="English"
              className="w-5 h-auto rounded-sm shadow-sm"
            />
            <span className="font-medium">English</span>
          </div>
        </DropdownItem>

        <DropdownItem
          key="ar"
          onClick={() => changeLanguage('ar')}
          className="hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 py-1">
            <img
              src="https://flagcdn.com/w20/sy.png"
              alt="Arabic"
              className="w-5 h-auto rounded-sm shadow-sm"
            />
            <span className="font-medium">العربية</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSwitcher;