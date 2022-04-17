import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// sample page routing
const Bank = Loadable(lazy(() => import('views/pages/banks/Index.js')));
const BankAdd = Loadable(lazy(() => import('views/pages/banks/add.js')));
const EditBank = Loadable(lazy(() => import('views/pages/banks/EditBank.js')));
const AddCustomer = Loadable(lazy(() => import('views/pages/customer/AddCustomer.js')));
const Customer = Loadable(lazy(() => import('views/pages/customer/Index.js')));
const EditCustomer = Loadable(lazy(() => import('views/pages/customer/EditCustomer.js')));
const Barang = Loadable(lazy(() => import('views/pages/barang/Index.js')));
const EditBarang = Loadable(lazy(() => import('views/pages/barang/EditBarang.js')));
const AddBarang = Loadable(lazy(() => import('views/pages/barang/AddBarang.js')));
const Ewallet = Loadable(lazy(() => import('views/pages/ewallet/Index.js')));
const AddEwallet = Loadable(lazy(() => import('views/pages/ewallet/AddEwallet.js')));
const EditEwallet = Loadable(lazy(() => import('views/pages/ewallet/EditEwallet.js')));
const Pengeluaran = Loadable(lazy(() => import('views/pages/pengeluaran/Index.js')));
const Pemasukan = Loadable(lazy(() => import('views/pages/pemasukan/Index.js')));
const Transaksi = Loadable(lazy(() => import('views/pages/transaksi/Index.js')));
const AddTransaksi = Loadable(lazy(() => import('views/pages/transaksi/AddTransaksi')));
const Profile = Loadable(lazy(() => import('views/pages/profile/Index')));
const AddPengeluaran = Loadable(lazy(()=> import('views/pages/pengeluaran/AddPengeluaran')));
const EditPengeluaran = Loadable(lazy(()=> import('views/pages/pengeluaran/EditPengeluaran')));

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
            path: '/bank/add',
            element: <BankAdd />
        },
        {
            path: '/bank/edit/:id',
            element: <EditBank />
        },
        {
            path: '/customer',
            element: <Customer />
        },
        {
            path: '/customer/add',
            element: <AddCustomer />
        },
        {
            path: '/customer/edit/:id',
            element: <EditCustomer />
        },
        {
            path: '/barang',
            element: <Barang />
        },
        {
            path: '/barang/add',
            element: <AddBarang />
        },
        {
            path: '/barang/edit/:id',
            element: <EditBarang />
        },
        {
            path: '/ewallet',
            element: <Ewallet />
        },
        {
            path: '/ewallet/add',
            element: <AddEwallet />
        },
        {
            path: '/ewallet/edit/:id',
            element: <EditEwallet />
        },
        {
            path: '/pengeluaran',
            element: <Pengeluaran />
        },
        {
            path:'/pengeluaran/add',
            element:<AddPengeluaran/>
        },
        {
            path:'/pengeluaran/edit/:id',
            element:<EditPengeluaran/>
        },
        {
            path: '/pemasukan',
            element: <Pemasukan />
        },
        {
            path: '/transaksi',
            element: <Transaksi />
        },
        {
            path: '/transaksi/add',
            element: <AddTransaksi />
        },
        {
            path: '/user/account-profile/profile',
            element: <Profile/>
        }
    ]
};

export default MainRoutes;
