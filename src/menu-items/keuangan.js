// assets
import { IconDashboard, IconArrowsLeftRight, IconCashBanknote } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconArrowsLeftRight, IconCashBanknote };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const keuangan = {
    id: 'keuangen',
    title: 'Keuangan',
    type: 'group',
    children: [
        {
            id: 'pengeluaran',
            title: 'Pengeluaran',
            type: 'item',
            url: '/pengeluaran',
            icon: icons.IconArrowsLeftRight,
            breadcrumbs: false
        }
    ]
};

export default keuangan;
