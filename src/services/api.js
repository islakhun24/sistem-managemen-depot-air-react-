import axios from "axios";
import authHeader from 'services/auth-header.service';
import {BANK, BARANG, CUSTOMER, EWALLET, PENGELUARAN} from '../constants/URL';

class ApiService {
    //BANK
    getBank = () => {
        return axios.get(`${BANK}`, {headers: authHeader()});
    }
    addBank = (data) => {
        console.log(authHeader());
        return axios.post(`${BANK}`, data, {headers: authHeader()});
    }
    updateBank = (id, data) => {
        return axios.put(`${BANK}/${id}`, data, {headers: authHeader()});
    }
    deleteBank = (id) => {
        return axios.delete(`${BANK}/${id}`, {headers: authHeader()});
    }
    getBankById = (id) => {
        return axios.get(`${BANK}/${id}`, {headers: authHeader()});
    }

    //Barang
    getBarang = () => {
        return axios.get(`${BARANG}`, {headers: authHeader()});
    }
    addBarang = (data) => {
        console.log(authHeader());
        return axios.post(`${BARANG}`, data, {headers: authHeader()});
    }
    updateBarang = (id, data) => {
        return axios.put(`${BARANG}/${id}`, data, {headers: authHeader()});
    }
    deleteBarang = (id) => {
        return axios.delete(`${BARANG}/${id}`, {headers: authHeader()});
    }
    getBarangById = (id) => {
        return axios.get(`${BARANG}/${id}`, {headers: authHeader()});
    }

    //Customer
    getCustomer = () => {
        return axios.get(`${CUSTOMER}`, {headers: authHeader()});
    }
    addCustomer = (data) => {
        console.log(authHeader());
        return axios.post(`${CUSTOMER}`, data, {headers: authHeader()});
    }
    updateCustomer = (id, data) => {
        return axios.put(`${CUSTOMER}/${id}`, data, {headers: authHeader()});
    }
    deleteCustomer = (id) => {
        return axios.delete(`${CUSTOMER}/${id}`, {headers: authHeader()});
    }
    getCustomerById = (id) => {
        return axios.get(`${CUSTOMER}/${id}`, {headers: authHeader()});
    }

    //Ewallet
    getEwallet = () => {
        return axios.get(`${EWALLET}`, {headers: authHeader()});
    }
    addEwallet = (data) => {
        console.log(authHeader());
        return axios.post(`${EWALLET}`, data, {headers: authHeader()});
    }
    updateEwallet = (id, data) => {
        return axios.put(`${EWALLET}/${id}`, data, {headers: authHeader()});
    }
    deleteEwallet = (id) => {
        return axios.delete(`${EWALLET}/${id}`, {headers: authHeader()});
    }
    getEwalletById = (id) => {
        return axios.get(`${EWALLET}/${id}`, {headers: authHeader()});
    }

    //Pengeluaran
    getPengeluaran = () => {
        return axios.get(`${PENGELUARAN}`, {headers: authHeader()});
    }
    addPengeluaran = (data) => {
        console.log(authHeader());
        return axios.post(`${PENGELUARAN}`, data, {headers: authHeader()});
    }
    updatePengeluaran = (id, data) => {
        return axios.put(`${PENGELUARAN}/${id}`, data, {headers: authHeader()});
    }
    deletePengeluaran = (id) => {
        return axios.delete(`${PENGELUARAN}/${id}`, {headers: authHeader()});
    }
    getPengeluaranById = (id) => {
        return axios.get(`${PENGELUARAN}/${id}`, {headers: authHeader()});
    }
}

export default new ApiService();