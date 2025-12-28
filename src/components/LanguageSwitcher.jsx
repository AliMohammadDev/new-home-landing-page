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

      <DropdownMenu className="bg-white text-[#025043] rounded-xl w-28 font-[Expo-arabic] overflow-hidden">
        <DropdownItem
          onClick={() => changeLanguage('en')}
          className="py-2 hover:bg-gray-100 cursor-pointer"
        >
          EN
        </DropdownItem>
        <DropdownItem
          onClick={() => changeLanguage('ar')}
          className="py-2 hover:bg-gray-100 cursor-pointer"
        >
          AR
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
