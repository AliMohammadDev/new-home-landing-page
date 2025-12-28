import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@heroui/react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileIcon from '../assets/icons/ProfileIcon';
import { useTranslation } from 'react-i18next';

const ProfileSwitcher = ({ setIsCartOpen }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Dropdown>
            <DropdownTrigger>
                <button className="bg-[#025043] p-2 cursor-pointer rounded-full hover:bg-[#507771] transition-all duration-200">
                    <ProfileIcon />
                </button>
            </DropdownTrigger>

            <DropdownMenu className="bg-white text-[#025043] rounded-xl w-40 font-[Expo-arabic] overflow-hidden">
                <DropdownItem
                    onClick={() => navigate('/profile')}
                >
                    <div className="flex items-center gap-3">
                        <span>{t('navbar.my_profile')}</span>
                    </div>
                </DropdownItem>

                <DropdownItem
                    onClick={() => {
                        setIsCartOpen(false);
                        navigate('/carts');
                    }}
                >
                    <div className="flex items-center gap-3">
                        <span>{t('navbar.my_cart')}</span>
                    </div>
                </DropdownItem>

                <DropdownItem
                    onClick={() => {
                        setIsCartOpen(false);
                        navigate('/my-orders');
                    }}
                >
                    <div className="flex items-center gap-3">
                        <span>{t('navbar.my_orders')}</span>
                    </div>
                </DropdownItem>

                <DropdownItem className="py-2 cursor-pointer">
                    <Link to="/logout" className="flex items-center">
                        <span>{t('navbar.logout')}</span>
                    </Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default ProfileSwitcher;
