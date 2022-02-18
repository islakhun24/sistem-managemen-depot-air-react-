
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Stack, TextField } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import apiService from '../../../services/api';

import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
// or for Day.js
// or for Luxon
// or for Moment.js

const Index = (props)=>{
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [nama_pengeluaran, setNamaPengeluaran] = React.useState('');
    const [satuan, setSatuan] = React.useState('');
    const [jumlah, setJumlah] = React.useState('');
    const [harga, setHarga] = React.useState('');
    const [keterangan, setKeterangan] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [id, setId] = React.useState('');
    const [data, setData] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(true);
    const columns = [
        {
          label: "Nama Pengeluaran",
          name: "nama_pengeluaran",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Satuan",
          name: "satuan",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Jumlah",
          name: "jumlah",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Harga",
          name: "harga",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Keterangan",
          name: "keterangan",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Tanggal",
          name: "date",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
            label: "Actions",
            name: "id",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Stack direction="row" spacing={2}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    color="success"
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        color: 'white',
                                    }}
                                    onClick={()=>{
                                        setNamaPengeluaran(tableMeta.rowData[0]);
                                        setSatuan(tableMeta.rowData[1])
                                        setJumlah(tableMeta.rowData[2])
                                        setHarga(tableMeta.rowData[3])
                                        setKeterangan(tableMeta.rowData[4])
                                        setId(value);
                                        setIsEdit(true)
                                        setOpen(true);

                                    }}>
                                    Edit
                                </Button>
                            </AnimateButton>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    sx={{
                                        color: 'white',
                                    }}
                                    color="error"
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    onClick={()=>{
                                        setNamaPengeluaran(tableMeta.rowData[0]);
                                        setSatuan(tableMeta.rowData[1])
                                        setJumlah(tableMeta.rowData[2])
                                        setHarga(tableMeta.rowData[3])
                                        setKeterangan(tableMeta.rowData[4])
                                        setId(value);
                                        setOpenDelete(true);

                                    }}>
                                    Hapus
                                </Button>
                            </AnimateButton>
                        </Stack>
                    )
                }
                }
        }
      ];
      
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenDelete = () => {
        apiService.deletePengeluaran(id).then(res=>{
            console.log(res);
            setOpenDelete(false);
            getData();
            clearForm();
        })
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
        clearForm();
    };
    const handleChangeNamaPengeluaran = (event) => {
        setNamaPengeluaran(event.target.value);
    }
    const handleNomorSatuan = (event) => {
        setSatuan(event.target.value);
    }
    const handleChangeJumlah = (event) => {
        setJumlah(event.target.value);
    }
    const handleChangeHarga = (event) => {
        setHarga(event.target.value);
    }
    const handleChangeKeterangan = (event) => {
        setKeterangan(event.target.value);
    }
    const handleChangeDate = (event) => {
        setDate(event.target.value);
    }
    const handleClose = () => {
        clearForm();
        setOpen(false);
    };
    const handleSubmit = () => {
        const formData = {
            nama_pengeluaran, jumlah, satuan, harga, keterangan, date
        }
        if(isEdit===true){
            apiService.updatePengeluaran(id, formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }else {
            apiService.addPengeluaran(formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }
        
    }

    const clearForm = () => {
        setNamaPengeluaran('');
        setSatuan('')
        setJumlah('')
        setHarga('')
        setKeterangan('')
        setId('');
        setIsEdit(false);
    }
    async function getData() {
        await apiService.getPengeluaran().then((response) => {
          // check if the data is populated
          
          setData(response.data.data);
          // you tell it that you had the result
          setLoadingData(false);
          console.log('data', response.data);
        });   
      }
    React.useEffect(() => {
        setData([]);
        
        if (loadingData) {
          // if the result is not ready so you make the axios call
          getData();
        }
      }, []);
    
   
    return (
       <div>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                            <Grid item md={10}>
                                <h1>Pengeluaran</h1>
                            </Grid>
                            <Grid item md={2}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="md"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClickOpen}>
                                    Tambah Pengeluaran
                                </Button>
                            </AnimateButton>
                            </Grid>
                </Grid>
                <MUIDataTable
                                elevation='0'
                                title={"Pengeluaran List"}
                                data={data}
                                options={{
                                    filterType: 'string',
                                }}
                                columns={columns}/>
           </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tambah Pengeluaran</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Tambahkan list pengeluaran anda.
                    </DialogContentText>
                    <Divider sx={{
                        mt:3, mb:3
                    }} light />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nama Pengeluaran"
                    type="text"
                    value={nama_pengeluaran}
                    fullWidth
                    variant="outlined"
                    onChange={handleChangeNamaPengeluaran}
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="Satuan"
                    type="text"
                    value={satuan}
                    fullWidth
                    onChange={handleNomorSatuan}
                    variant="outlined"
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="Jumlah"
                    type="number"
                    fullWidth
                    value={jumlah}
                    onChange={handleChangeJumlah}
                    variant="outlined"
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="Harga"
                    type="number"
                    value={harga}
                    onChange={handleChangeHarga}
                    fullWidth
                    variant="outlined"
                    />
                    <TextField
                    
                    margin="dense"
                    id="name"
                    label="Keterangan"
                    type="text"
                    value={keterangan}
                    onChange={handleChangeKeterangan}
                    fullWidth
                    variant="outlined"
                    />
                     <LocalizationProvider dateAdapter={DateAdapter}>
                     <DatePicker
                        label="Tanggal"
                        
                        variant="outlined"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                          }}
                        renderInput={(params) => <TextField sx={{
                            mt: 2
                        }} fullWidth {...params} />}
                        />
                     </LocalizationProvider>
                    
                </DialogContent>
                <DialogActions sx={{mb: 1}}>
                    <Button sx={{color: '#CC0000'}} onClick={handleClose}>Keluar</Button>
                    <Button size="small" sx={{mr: 2}}
                            type="submit"
                            variant="contained" color="primary" onClick={handleSubmit}>Simpan</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Apakah anda yakin ingin hapus data <b>{nama_pengeluaran}</b>?.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDelete}>Batal</Button>
                <Button onClick={handleClickOpenDelete} autoFocus>
                    Hapus
                </Button>
                </DialogActions>
            </Dialog>
       </div>
    );
}



export default Index;