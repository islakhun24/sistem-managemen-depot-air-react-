import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const Bank = Loadable(lazy(() => import('views/pages/banks/Index.js')));
const Customer = Loadable(lazy(() => import('views/pages/customer/Index.js')));
const Barang = Loadable(lazy(() => import('views/pages/barang/Index.js')));
const Ewallet = Loadable(lazy(() => import('views/pages/ewallet/Index.js')));
const Pengeluaran = Loadable(lazy(() => import('views/pages/pengeluaran/Index.js')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/bank',
            element: <Bank />
        },
        {
            path: '/customer',
            element: <Customer />
        },
        {
            path: '/barang',
            element: <Barang />
        },
        {
            path: '/ewallet',
            element: <Ewallet />
        },
        {
            path: '/pengeluaran',
            element: <Pengeluaran />
        },
    ]
};

export default MainRoutes;
