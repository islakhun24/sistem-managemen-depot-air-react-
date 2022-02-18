
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Stack, TextField } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import apiService from '../../../services/api';


const Index = (props)=>{
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [nama_barang, setNamaBarang] = React.useState('');
    const [satuan, setSatuan] = React.useState('');
    const [jumlah, setJumlah] = React.useState('');
    const [harga, setHarga] = React.useState('');
    const [id, setId] = React.useState('');
    const [data, setData] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(true);
    const columns = [
        {
          label: "Nama Barang",
          name: "nama_barang",
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
                                        setNamaBarang(tableMeta.rowData[0]);
                                        setSatuan(tableMeta.rowData[1]);
                                        setJumlah(tableMeta.rowData[2]);
                                        setHarga(tableMeta.rowData[3]);
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
                                        setNamaBarang(tableMeta.rowData[0]);
                                        setSatuan(tableMeta.rowData[1]);
                                        setJumlah(tableMeta.rowData[2]);
                                        setHarga(tableMeta.rowData[3]);
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
        apiService.deleteBarang(id).then(res=>{
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
    const handleChangeNamaBarang = (event) => {
        setNamaBarang(event.target.value);
    }
    const handleChangeSatuan = (event) => {
        setSatuan(event.target.value);
    }
    const handleChangeJumlah = (event) => {
        setJumlah(event.target.value);
    }
    const handleChangeHarga = (event) => {
        setHarga(event.target.value);
    }
    const handleClose = () => {
        clearForm();
        setOpen(false);
    };
    const handleSubmit = () => {
        const formData = {
            nama_barang, satuan, jumlah, harga
        }
        if(isEdit===true){
            apiService.updateBarang(id, formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }else {
            apiService.addBarang(formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }
        
    }

    const clearForm = () => {
        setNamaBarang('');
        setSatuan('');
        setJumlah('');
        setHarga('');
        setId('');
        setIsEdit(false);
    }
    async function getData() {
        await apiService.getBarang().then((response) => {
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
                                <h1>Barang</h1>
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
                                    Tambah Barang
                                </Button>
                            </AnimateButton>
                            </Grid>
                </Grid>
                <MUIDataTable
                                elevation='0'
                                title={"Barang List"}
                                data={data}
                                options={{
                                    filterType: 'string',
                                }}
                                columns={columns}/>
           </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tambah Barang</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Tambahkan list barang anda.
                    </DialogContentText>
                    <Divider sx={{
                        mt:3, mb:3
                    }} light />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nama Barang"
                    type="text"
                    value={nama_barang}
                    fullWidth
                    variant="outlined"
                    onChange={handleChangeNamaBarang}
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
                    onChange={handleChangeSatuan}
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
                    type="text"
                    value={harga}
                    onChange={handleChangeHarga}
                    fullWidth
                    variant="outlined"
                    />
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
                    Apakah anda yakin ingin hapus data <b>{nama_barang}</b>?.
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