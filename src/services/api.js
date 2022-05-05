import axios from "axios";
import authHeader from 'services/auth-header.service';
import {BANK, BARANG, CUSTOMER, EWALLET, PENGELUARAN, TRANSAKSI, DASHBOARD} from '../constants/URL';

class ApiService {
    //BANK
    static getBank = (query) => {
        return axios.get(`${BANK}${query}`, {headers: authHeader()});
    }
    static addBank = (data) => {
        console.log(authHeader());
        return axios.post(`${BANK}`, data, {headers: authHeader()});
    }
    static updateBank = (id, data) => {
        return axios.put(`${BANK}/${id}`, data, {headers: authHeader()});
    }
    static deleteBank = (id) => {
        return axios.delete(`${BANK}/${id}`, {headers: authHeader()});
    }
    static getBankById = (id) => {
        return axios.get(`${BANK}/${id}`, {headers: authHeader()});
    }

    //Barang
    static getBarang = (query) => {
        return axios.get(`${BARANG}${query}`, {headers: authHeader()});
    }
    static addBarang = (data) => {
        console.log(authHeader());
        return axios.post(`${BARANG}`, data, {headers: authHeader()});
    }
    static updateBarang = (id, data) => {
        return axios.put(`${BARANG}/${id}`, data, {headers: authHeader()});
    }
    static deleteBarang = (id) => {
        return axios.delete(`${BARANG}/${id}`, {headers: authHeader()});
    }
    static getBarangById = (id) => {
        return axios.get(`${BARANG}/${id}`, {headers: authHeader()});
    }

    //Customer
    static getCustomer = (query) => {
        return axios.get(`${CUSTOMER}${query}`, {headers: authHeader()});
    }
    static addCustomer = (data) => {
        console.log(authHeader());
        return axios.post(`${CUSTOMER}`, data, {headers: authHeader()});
    }
    static updateCustomer = (id, data) => {
        return axios.put(`${CUSTOMER}/${id}`, data, {headers: authHeader()});
    }
    static deleteCustomer = (id) => {
        return axios.delete(`${CUSTOMER}/${id}`, {headers: authHeader()});
    }
    static getCustomerById = (id) => {
        return axios.get(`${CUSTOMER}/${id}`, {headers: authHeader()});
    }

    //Ewallet
    static getEwallet = (query) => {
        return axios.get(`${EWALLET}${query}`, {headers: authHeader()});
    }
    static addEwallet = (data) => {
        console.log(authHeader());
        return axios.post(`${EWALLET}`, data, {headers: authHeader()});
    }
    static updateEwallet = (id, data) => {
        return axios.put(`${EWALLET}/${id}`, data, {headers: authHeader()});
    }
    static deleteEwallet = (id) => {
        return axios.delete(`${EWALLET}/${id}`, {headers: authHeader()});
    }
    static getEwalletById = (id) => {
        return axios.get(`${EWALLET}/${id}`, {headers: authHeader()});
    }

    //Pengeluaran
    static getPengeluaran = (query) => {
        return axios.get(`${PENGELUARAN}${query}`, {headers: authHeader()});
    }
    static addPengeluaran = (data) => {
        console.log(authHeader());
        return axios.post(`${PENGELUARAN}`, data, {headers: authHeader()});
    }
    static updatePengeluaran = (id, data) => {
        return axios.put(`${PENGELUARAN}/${id}`, data, {headers: authHeader()});
    }
    static deletePengeluaran = (id) => {
        return axios.delete(`${PENGELUARAN}/${id}`, {headers: authHeader()});
    }
    static getPengeluaranById = (id) => {
        return axios.get(`${PENGELUARAN}/${id}`, {headers: authHeader()});
    }

    //TRANSAKSI
    static getCustomerTransaksi = (nama_customer) => {
        return axios.get(`${TRANSAKSI}/get_customer?nama_customer=${nama_customer}`, {headers: authHeader()});
    }
    static getBarangsTransaksi = (nama_barang) => {
        return axios.get(`${TRANSAKSI}/get_barang?nama_barang=${nama_barang}`, {headers: authHeader()});
    }
    static getBanksTransaksi = (nama_bank) => {
        return axios.get(`${TRANSAKSI}/get_bank?nama_bank=${nama_bank}`, {headers: authHeader()});
    }
    static getWalletTransaksi = (nama_wallet) => {
        return axios.get(`${TRANSAKSI}/get_wallet?nama_wallet=${nama_wallet}`, {headers: authHeader()});
    }

    static postTransaksi = (formdata) => {
        return axios.post(`${TRANSAKSI}/post`, formdata, {headers: authHeader()});
    }

    static detailTransaksi = (id) => {
        return axios.get(`${TRANSAKSI}/detail/${id}`, {headers: authHeader()});
    }

    static getTransaksi = (query) => {
        return axios.get(`${TRANSAKSI}/get${query}`, {headers: authHeader()});
    }
    static getPengeluaranDashboard = () => {
        return axios.get(`${DASHBOARD}/total_pengeluaran`, {headers: authHeader()});
    }
    static getPPemasukanDashboard = () => {
        return axios.get(`${DASHBOARD}/total_pemasukan`, {headers: authHeader()});
    }

    static getTotalTransaksiDashboard = () => {
        return axios.get(`${DASHBOARD}/total_transaksi`, {headers: authHeader()});
    }

    static changeStatusTransaksi= (id) => {
        return axios.put(`${TRANSAKSI}/update_status/${id}`,{}, {headers: authHeader()});
    }
    static deleteTransaksi= (id) => {
        return axios.delete(`${TRANSAKSI}/delete/${id}`, {headers: authHeader()});
    }
    static chartDashboard= () => {
        return axios.get(`${DASHBOARD}/chart`, {headers: authHeader()});
    }
}

export default ApiService;