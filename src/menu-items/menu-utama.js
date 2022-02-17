// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

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
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'barang',
            title: 'Barang',
            type: 'item',
            url: '/barang',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'customer',
            title: 'Customer',
            type: 'item',
            url: '/customer',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'ewallet',
            title: 'E-Wallet',
            type: 'item',
            url: '/ewallet',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default MenuUtama;
