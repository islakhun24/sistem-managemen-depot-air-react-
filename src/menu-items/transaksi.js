// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const keuangan = {
    id: 'transaksi',
    title: 'Transaksi',
    type: 'group',
    children: [
        {
            id: 'pesanan_baru',
            title: 'Pesanan Baru',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'transaksion',
            title: 'Transaksi',
            type: 'item',
            url: '/transaksi',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default keuangan;
