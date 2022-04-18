// assets
import { IconDashboard, IconList } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconList };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'transk',
            title: 'Transaksi',
            type: 'item',
            url: '/transaksi',
            icon: icons.IconList,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
