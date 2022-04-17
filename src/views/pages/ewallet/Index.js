import {
    Typography,
    Card,
    Pagination,
    Button,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    Dialog,
  } from "@mui/material";
  import React, { useCallback, useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import service from "../../../services/api";
  
  const Index = () => {
    
    const [loading, setLoading] = useState(true);
      const [totalItems, setTotalItems] = useState(0);
      const [wallet, setWallet] = useState([]);
      const [totalPages, setTotalPages] = useState(0);
      const [currentPage, setCurrentPage] = useState(1);
      const [query, setQuery] = useState('');
      const [open, setOpen] = useState(false);
      const [id, setId] = useState(null);
      const fetchData = useCallback(async () => {
        const response = await service.getEwallet(query);
        return response;
      }, [query]);
     
      useEffect(() => {
          fetchData().then(response => {
            setWallet(response.data.wallet);
            setTotalItems(response.data.totalItems);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
            setLoading(false);
          }).catch(error => {
              console.log(error);
              setLoading(false);
          });
      }, [query, fetchData]);
  
      const handlePagination = (event, value) => {
        setQuery('?page=' + (value-1) + query);
      };
      
      const handleSearch = (event) => {
        setQuery('?nama_wallet=' + event.target.value);
  
      };
      const handleClose = () => {
        setOpen(false);
    };
      const handleDialogDelete = async (id) =>{
        setOpen(true);
        setId(id)
      }
      const handleDelete = async () => {
        await service.deleteEwallet(id);
        fetchData().then(response => {
          setWallet(response.data.wallet);
          setTotalItems(response.data.totalItems);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
          setLoading(false);
          setOpen(false)
        }).catch(error => {
            console.log(error);
            setLoading(false);
            setOpen(false)
        });
      };
      return (
        <div>
          <Typography variant="h3" component="h4">
            E-Wallet
          </Typography>
          ;
          <Card variant="elevation" sx={{ p: 3 }}>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
              <div className="col-span-1">
                <div className="w-full flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                  <input
                    type="text"
                    placeholder="Cari nama akun"
                    className="w-full focus:outline-none"
                    name=""
                    onChange={handleSearch}
                    id=""
                  />
                  <button>
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1 flex justify-end">
                <div>
                  <Link
                    to="/ewallet/add"
                    className="px-8 py-2 rounded bg-green-600 text-white font-bold flex-1"
                  >
                    Tambah +
                  </Link>
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nama Wallet
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nomor HP
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    QR CODE
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {wallet.map((val) => {
                  return (
                    <tr key={val.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{val.nama_wallet}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{val.nomor_hp}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{val.qr_code}</p>
                      </td>
                       <td className="px-5 flex gap-2 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link
                          to={`/ewallet/edit/${val.id}`}
                          className="px-4 py-2 rounded bg-green-600 text-white font-bold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            handleDialogDelete(val.id);
                          }}
                          className="px-4 py-2 rounded bg-red-600 text-white font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
    
            <div className="mt-3 flex md:flex-row flex-col items-center justify-between ">
              <div className="block w-full md:w-auto md:flex flex-row items-start">
                Result: &nbsp; <span className="font-medium">1-15</span> &nbsp;dari
                &nbsp;<span className="font-medium">1000</span>&nbsp; data
              </div>
              <div className="mt-3 md:mt-0 block md:flex">
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
                  {"Hapus Wallet"}
                  </DialogTitle>
                  <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      apakah anda yakin ingin Hapus Wallet ?
                  </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <Button color="primary" onClick={handleClose}>Batal</Button>
                  <Button  color="error" onClick={handleDelete} autoFocus>
                      Hapus
                  </Button>
                  </DialogActions>
              </Dialog>
        </div>
      );
  };
  
  export default Index;
  