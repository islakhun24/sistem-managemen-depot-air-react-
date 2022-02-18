
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Stack, TextField } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import apiService from '../../../services/api';


const Index = (props)=>{
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [nama_customer, setNamaCustomer] = React.useState('');
    const [nohp_customer, setNoHpCustomer] = React.useState('');
    const [alamat_customer, setAlamatCustomer] = React.useState('');
    const [id, setId] = React.useState('');
    const [data, setData] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(true);
    const columns = [
        {
          label: "Nama Customer",
          name: "nama_customer",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Nomor HP",
          name: "nohp_customer",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Alamat",
          name: "alamat_customer",
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
                                        setNamaCustomer(tableMeta.rowData[0]);
                                        setNoHpCustomer(tableMeta.rowData[1]);
                                        setAlamatCustomer(tableMeta.rowData[2]);
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
                                        setNamaCustomer(tableMeta.rowData[0]);
                                        setNoHpCustomer(tableMeta.rowData[1]);
                                        setAlamatCustomer(tableMeta.rowData[2]);
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
        apiService.deleteCustomer(id).then(res=>{
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
    const handleChangeNamaCustomer = (event) => {
        setNamaCustomer(event.target.value);
    }
    const handleNoHpCustomer = (event) => {
        setNoHpCustomer(event.target.value);
    }
    const handleChangeAlamatCustomer = (event) => {
        setAlamatCustomer(event.target.value);
    }
    const handleClose = () => {
        clearForm();
        setOpen(false);
    };
    const handleSubmit = () => {
        const formData = {
            nama_customer, nohp_customer, alamat_customer
        }
        if(isEdit===true){
            apiService.updateCustomer(id, formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }else {
            apiService.addCustomer(formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }
        
    }

    const clearForm = () => {
        setNamaCustomer('');
        setNoHpCustomer('');
        setAlamatCustomer('');
        setId('');
        setIsEdit(false);
    }
    async function getData() {
        await apiService.getCustomer().then((response) => {
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
                                <h1>Customer</h1>
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
                                    Tambah Customer
                                </Button>
                            </AnimateButton>
                            </Grid>
                </Grid>
                <MUIDataTable
                                elevation='0'
                                title={"Customer List"}
                                data={data}
                                options={{
                                    filterType: 'string',
                                }}
                                columns={columns}/>
           </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tambah Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Tambahkan list customer anda.
                    </DialogContentText>
                    <Divider sx={{
                        mt:3, mb:3
                    }} light />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nama Customer"
                    type="text"
                    value={nama_customer}
                    fullWidth
                    variant="outlined"
                    onChange={handleChangeNamaCustomer}
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="Nomor Hp"
                    type="text"
                    value={nohp_customer}
                    fullWidth
                    onChange={handleNoHpCustomer}
                    variant="outlined"
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="Alamat"
                    type="text"
                    fullWidth
                    value={alamat_customer}
                    onChange={handleChangeAlamatCustomer}
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
                    Apakah anda yakin ingin hapus data <b>{nama_customer}</b>?.
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