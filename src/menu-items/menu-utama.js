// assets
import { IconDashboard, IconBuildingBank, IconArchive, IconUsers, IconWallet} from '@tabler/icons';

// constant
const icons = { IconDashboard,  IconBuildingBank, IconArchive, IconUsers, IconWallet};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const MenuUtama = {
    id: 'menu_utama',
    title: 'Menu Utama',
    type: 'group',
    children: [
        {
            id: 'bank',
            title: 'Banks',
            type: 'item',
            url: '/bank',
            icon: icons.IconBuildingBank,
            breadcrumbs: false
        },
        {
            id: 'barang',
            title: 'Barang',
            type: 'item',
            url: '/barang',
            icon: icons.IconArchive,
            breadcrumbs: false
        },
        {
            id: 'customer',
            title: 'Customer',
            type: 'item',
            url: '/customer',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'ewallet',
            title: 'E-Wallet',
            type: 'item',
            url: '/ewallet',
            icon: icons.IconWallet,
            breadcrumbs: false
        }
    ]
};

export default MenuUtama;
