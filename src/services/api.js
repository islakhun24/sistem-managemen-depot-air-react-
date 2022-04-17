import axios from "axios";
import authHeader from 'services/auth-header.service';
import {BANK, BARANG, CUSTOMER, EWALLET, PENGELUARAN} from '../constants/URL';

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
    getEwalletById = (id) => {
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
}

export default ApiService;