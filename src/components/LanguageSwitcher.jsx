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
  const currentLanguage = i18n.language.substring(0, 2);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="relative bg-[#025043] p-2 flex items-center justify-center cursor-pointer rounded-full hover:bg-[#507771] transition-all duration-200 w-10 h-10">

          <span className="absolute -top-1 -right-1 bg-white text-[#025043] text-[8px] font-bold px-1 py-0.5 rounded-full uppercase">
            {currentLanguage}
          </span>

          <LanguageIcon className="w-5 h-5 text-white" />

        </button>
      </DropdownTrigger>

      <DropdownMenu
        className="bg-white text-[#025043] rounded-xl w-32 font-[Expo-arabic] p-1"
        aria-label="Language Actions"
      >
        <DropdownItem key="en" onClick={() => changeLanguage('en')}>
          <div className="flex items-center gap-3 py-1">
            <img src="https://flagcdn.com/w20/gb.png" alt="English" className="w-5 h-auto rounded-sm" />
            <span className="font-medium">English</span>
          </div>
        </DropdownItem>

        <DropdownItem key="ar" onClick={() => changeLanguage('ar')}>
          <div className="flex items-center gap-3 py-1">
            <img src="https://flagcdn.com/w20/sy.png" alt="Arabic" className="w-5 h-auto rounded-sm" />
            <span className="font-medium">العربية</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSwitcher;