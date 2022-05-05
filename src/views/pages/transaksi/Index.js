import { Typography, Card, Paper, IconButton, MenuIcon, InputBase, SearchIcon, Divider, DirectionsIcon, Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import service from "../../../services/api";

import { useNavigate } from "react-router";
const Index = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems]= useState(0);
    const [totalPages, setTotalPages]= useState(0);
    const [transaksi, setTransaksi]= useState([])
    const [query, setQuery] = useState("")
    const [id, setId]= useState("")
   const [open, setOpen] = useState(false)
    const handlePagination = (event, value) => {
        setQuery('?page=' + (value-1) + query);
      };
      const handleClose = () => {
        setOpen(false);
    };
      const handleSearch = (event) => {
        setQuery('?nama_customer=' + event.target.value);
  
      };
      const handleDialogOpen = async (id) =>{
        setOpen(true);
        setId(id)
      }

      const handleDialogOpenSubmit = async () => {
        await service.changeStatusTransaksi(id);
        await fetchData().then(res=>{
            const {data} = res
            setCurrentPage(data.currentPage)
            setTotalItems(data.totalItems)
            setTotalPages(data.totalPages)
            setTransaksi(data.transaksi)
        })
        setOpen(false);
      }

    const fetchData = useCallback(async () => {
        const response = await service.getTransaksi(query);
        return response;
      }, [query]);
      
        useEffect(()=>{
            fetchData().then(res=>{
                const {data} = res
                setCurrentPage(data.currentPage)
                setTotalItems(data.totalItems)
                setTotalPages(data.totalPages)
                setTransaksi(data.transaksi)
            })
        },[fetchData])
        return (
            <div>
                <Typography variant="h3" component="h4">
                    Transaksi
                </Typography>;
                <Card variant="elevation" sx={{p: 3 }}>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-8'>
                        <div className='col-span-1'>
                            <div className='w-full flex flex-row gap-2 rounded border border-gray-200 px-3 py-2'>
                                <input type="text" onChange={handleSearch} placeholder='Cari nama customer' className='w-full focus:outline-none' name="" id="" />
                                <button>
                                    <i className='fa fa-search'/>
                                </button>
                            </div>
                        </div>
                        <div className='col-span-1'>

                        </div>
                        <div className='col-span-1 flex justify-end'>
                             <div>
                             <Link to="/transaksi/add" className='px-8 py-2 rounded bg-green-600 text-white font-bold flex-1'>Tambah +</Link>
                            </div>
                        </div>
                    </div>
                    <hr className='my-5' />
                    
                    <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-4'>
                        {
                            transaksi.map(val=>{
                                return (
                                    <div key={val}  className='col-span-1 p-3 hover:bg-purple-200 rounded border border-gray-300 '>
                                        <div className='flex justify-between flex-row'>
                                                <Link to={`/transaksi/detail/${val.id}`} className='flex  cursor-pointer items-center flex-row gap-3'>
                                                    <div className='rounded-full bg-purple-300 h-8 w-8 items-center justify-center flex'>
                                                        <p className='text-md font-bold text-purple-600'>{(val.customer.nama_customer).split('')[0] || '-'}</p>
                                                    </div>
                                                    <div className='flex flex-col'> 
                                                        <div className='text-md text-black font-semibold'>{val.customer.nama_customer || '-'}</div>
                                                        <div>{val.customer.alamat_customer || '-'}</div>
                                                    </div>
                                                </Link>
                                                <div className='flex flex-col items-end justify-end'>
                                                    <div className='font-semibold text-green-600 '>Rp. {val.total_biaya || '0'},-</div>
                                                    <div className='text-md text-gray-400 '>
                                                    {
                    val.payment_methods === 'bank_transfer' ? 'Bank Transfer': (
                        val.payment_methods === 'e_wallet' ? 'E-Wallet' : (
                            val.payment_methods === 'cash' ? 'Cash' : 'Tidak ada'
                        )
                    )}
                                                    </div>
                                                </div>
                                        </div>

                                        <hr className='my-3 w-full'/>
                                        <div className='flex flex-row justify-between items-center'>
                                            <div className='text-xs text-indigo-500 font-semibold bg-indigo-100 px-1.5 py-0.5 rounded'>
                                                {
                                                    val.metode_pengiriman === 'di_antar' ? 'Di antar' : 
                                                    (val.metode_pengiriman === 'ambil_sendiri' ? 'Ambil sendiri' : 'Tidak ada')
                                                }
                                            </div>
                                            <div className='text-xs font-normal'>
                                                {(val.date).split('T')[0]}
                                            </div>
                                        </div>
                                        <div className='flex flex-col  mt-3 rounded bg-gray-100 p-3'>
                                            <div className='flex flex-row justify-between items-center'>
                                                <div className='flex flex-col text-xs'>
                                                    <div className='font-semibold text-black'>{val.barang.nama_barang || ''}</div>
                                                    <div>@ Rp. {val.barang.harga},-</div>
                                                </div>
                                                <div className='flex flex-col text-xs'>
                                                    <div className='font-semibold text-black'>{val.jumlah} {val.barang.satuan}</div>
                                                </div>
                                            </div>
                                            <hr className='my-3'/>
                                            <div className='flex justify-end items-end text-xs font-semibold text-black'>
                                                Rp. {val.total_harga},-
                                            </div>
                                        </div>
                                        <div className='w-full mt-3'>
                                            {
                                                val?.status === 'lunas' ? (
                                                    <div className='text-white py-2 items-center text-center justify-center cursor-not-allowed bg-green-500'>
                                                        Lunas
                                                    </div>
                                                ): (
                                                    <button onClick={()=>handleDialogOpen(val?.id)} className='py-2 hover:bg-yellow-600 text-white w-full bg-yellow-500'>
                                                Belum Membayar
                                            </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    <div className='mt-3 flex md:flex-row flex-col items-center justify-between '>
                        <div className='block w-full md:w-auto md:flex flex-row items-start'>
                            Result: &nbsp;<span className='font-medium'>{totalItems || '0'}</span>&nbsp; data
                        </div>
                        <div className='mt-3 md:mt-0 block md:flex'>
                        <Pagination onChange={handlePagination} count={totalPages} variant="outlined" shape="rounded" />
                        </div>
                    </div>
                </Card>
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Konfirmasi Pembayaran"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    apakah anda yakin transaksi ini telah dibayar ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button color="primary" onClick={handleClose}>Batal</Button>
                <Button  color="error" onClick={handleDialogOpenSubmit} autoFocus>
                    Setuju
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
}

export default Index;