import { Typography, Card, Paper, IconButton, MenuIcon, InputBase, SearchIcon, Divider, DirectionsIcon, Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import service from "../../../services/api";

import { useNavigate } from "react-router";
const Index = () => {
    const navigate = useNavigate();
    const [tanggalSampaiDownload, setTanggalSampaiDownload] = React.useState("");
    const [tanggalDariDownload, setTanggalDariDownload] = React.useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems]= useState(0);
    const [openPrint, setOpenPrint] = useState(false);
    const [page, setPage] = useState("");
    const [totalPages, setTotalPages]= useState(0);
    const [transaksi, setTransaksi]= useState([])
    const [query, setQuery] = useState("")
    const [namaCustomer, setNamaCustomer] = useState("")
    const [tanggalDari, setTanggalDari] = useState("")
    const [tanggalSampai, setTanggalSampai] = useState("")
    const [id, setId]= useState("")
   const [open, setOpen] = useState(false)
    const handlePagination = (event) => {
        setPage(event.target.value);
        let fromDate = null;
        let toDate = null;
    
        if (tanggalDari) {
          fromDate = tanggalDari.split("/").reverse().join("-");
        }
    
        if (tanggalSampai) {
          toDate = tanggalSampai.split("/").reverse().join("-");
        }
    
        const formdata = {
          page: page,
          size: 15,
          nama_customer: namaCustomer,
          fromDate,
          toDate,
        };
    
        fetchData(formdata)
          .then((response) => {
            setTransaksi(response.data.transaksi);
            setTotalItems(response.data.totalItems);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const handleClose = () => {
        setOpen(false);
    };
     
      const handleDialogOpen = async (id) =>{
        setOpen(true);
        setId(id)
      }
      const openPrintHandle = (e) => {
        setOpenPrint(true);
      };
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
      const handleSubmit = (e) => {
        let fromDate = null;
        let toDate = null;
    
        if (tanggalDari) {
          fromDate = tanggalDari.split("/").reverse().join("-");
        }
    
        if (tanggalSampai) {
          toDate = tanggalSampai.split("/").reverse().join("-");
        }
    
        const formdata = {
          page: page,
          size: 15,
          nama_customer: namaCustomer,
          fromDate,
          toDate,
        };
    
        fetchData(formdata)
          .then((response) => {
            setTransaksi(response.data.transaksi);
            setTotalItems(response.data.totalItems);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const handleSubmitDownload = (e) => {
        let fromDate = null;
        let toDate = null;
    
        if (tanggalDariDownload) {
          fromDate = tanggalDariDownload.split("/").reverse().join("-");
        }
    
        if (tanggalSampaiDownload) {
          toDate = tanggalSampaiDownload.split("/").reverse().join("-");
        }
        const formdata = {
          toDate,
          fromDate,
        };
        service
          .downloadTransaksi(formdata)
          .then((response) => {
            setTanggalDariDownload(false);
            setTanggalSampaiDownload(false);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
    
            link.href = url;
            link.setAttribute("download", `${Date.now()}.xlsx`);
    
            document.body.appendChild(link);
            link.click();
    
            link.remove();
            setOpenPrint(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const handleClear = (e) => {
        setNamaCustomer("");
        setTanggalDari("");
        setTanggalSampai("");
        setPage(0);
        fetchData(null)
          .then((response) => {
            setTransaksi(response.data.transaksi);
            setTotalItems(response.data.totalItems);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    const fetchData = useCallback(async (formdata) => {
        const response = await service.getTransaksi(formdata);
        return response;
      }, []);
      
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
                <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          <div className="col-span-1 items-center md:col-span-2 grid-col-1 gap-3 grid md:grid-cols-3">
            <div className="col-span-1 items-center">
              <div className="w-full items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                <input
                  type="text"
                  placeholder="Cari nama customer"
                  className="w-full focus:outline-none"
                  name=""
                  onChange={(e) => {
                    setNamaCustomer(e.target.value);
                  }}
                  id=""
                />
                <button>
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
            <div className="col-span-1 items-center md:col-span-2 ">
              <div className="col-span-1 items-center gap-3 grid md:grid-cols-2 grid-cols-1">
                <div className="col-span-1">
                  <div className="w-full items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                    <input
                      pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                      type="date"
                      placeholder="Dari"
                      className="w-full focus:outline-none"
                      name=""
                      onChange={(e) => {
                        setTanggalDari(e.target.value);
                      }}
                      value={tanggalDari}
                      id=""
                    />
                  </div>
                </div>
                <div className="col-span-1 items-center">
                  <div className="w-full items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                    <input
                      pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                      type="date"
                      placeholder="Sampai"
                      className="w-full focus:outline-none"
                      name=""
                      onChange={(e) => {
                        setTanggalSampai(e.target.value);
                      }}
                      value={tanggalSampai}
                      id=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 items-center flex justify-end">
            <div className="flex w-full flex-col md:flex-row gap-3">
              <button
                onClick={handleClear}
                className="px-16 py-2 w-full rounded bg-red-600 text-white font-bold flex-1"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="px-16 py-2 w-full rounded bg-blue-600 text-white font-bold flex-1"
              >
                Cari
              </button>
            </div>
          </div>
        </div>
        <div>
          <hr className="my-5" />
          <div className="flex md:flex-row flex-col gap-3 w-full mt-3 items-end justify-between">
            <button
              onClick={openPrintHandle}
              to="/pengeluaran/add"
              className="px-8 py-2 w-full items-center justify-center md:w-auto text-center rounded bg-yellow-600 text-white font-bold"
            >
              Cetak / Download
            </button>
            <Link
              to="/pengeluaran/add"
              className="px-8 py-2 w-full items-center justify-center md:w-auto text-center rounded bg-green-600 text-white font-bold"
            >
              Tambah +
            </Link>
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
            <form className="w-1/2">
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openPrint}
          onClose={() => setOpenPrint(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"DOWNLOAD FILE"}</DialogTitle>
          <DialogContent>
            <div>
              <div className="md:flex-row flex-col gap-3 w-full">
                <div className="col-span-1 w-full">
                  <p className="font-bold">Dari</p>
                  <div className="w-full mt-2 items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                    <input
                      pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                      type="date"
                      placeholder="Sampai"
                      className="w-full focus:outline-none"
                      name="fromDate"
                      value={tanggalDariDownload}
                      onChange={(e) => {
                        setTanggalDariDownload(e.target.value);
                      }}
                      id="fromDate"
                    />
                  </div>
                </div>
                <br />
                <div className="col-span-1  w-full">
                  <p className="font-bold">Sampai</p>
                  <div className="w-full mt-2 items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                    <input
                      pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                      type="date"
                      placeholder="Sampai"
                      onChange={(e) => {
                        setTanggalSampaiDownload(e.target.value);
                      }}
                      value={tanggalSampaiDownload}
                      className="w-full focus:outline-none"
                      name="toDate"
                      id="toDate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPrint(false)}>Batal</Button>
            <Button onClick={handleSubmitDownload} autoFocus>
              Download
            </Button>
          </DialogActions>
        </Dialog>
      </form>
            </div>
        );
}

export default Index;