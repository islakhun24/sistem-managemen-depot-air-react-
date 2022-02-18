// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const keuangan = {
    id: 'keuangen',
    title: 'Keuangan',
    type: 'group',
    children: [
        {
            id: 'pemasukan',
            title: 'Pemasukan',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'pengeluaran',
            title: 'Pengeluaran',
            type: 'item',
            url: '/pengeluaran',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default keuangan;
