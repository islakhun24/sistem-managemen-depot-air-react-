
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Stack, TextField } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import apiService from '../../../services/api';


const Index = (props)=>{
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [nama_wallet, setNamaWallet] = React.useState('');
    const [nomor_hp, setNoHp] = React.useState('');
    const [qr_code, setQrCode] = React.useState('');
    const [id, setId] = React.useState('');
    const [data, setData] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(true);
    const columns = [
        {
          label: "Nama Wallet",
          name: "nama_wallet",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Nomor HP",
          name: "nomor_hp",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "QR CODE",
          name: "qr_code",
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
                                        setNamaWallet(tableMeta.rowData[0]);
                                        setNoHp(tableMeta.rowData[1]);
                                        setQrCode(tableMeta.rowData[2]);
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
                                        setNamaWallet(tableMeta.rowData[0]);
                                        setNoHp(tableMeta.rowData[1]);
                                        setQrCode(tableMeta.rowData[2]);
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
        apiService.deleteEwallet(id).then(res=>{
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
    const handleChangeNamaWallet = (event) => {
        setNamaWallet(event.target.value);
    }
    const handleNoHp = (event) => {
        setNoHp(event.target.value);
    }
    const handleChangeQrCode = (event) => {
        setQrCode(event.target.value);
    }
    const handleClose = () => {
        clearForm();
        setOpen(false);
    };
    const handleSubmit = () => {
        const formData = {
            nama_wallet, nomor_hp, qr_code
        }
        if(isEdit===true){
            apiService.updateEwallet(id, formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }else {
            apiService.addEwallet(formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }
        
    }

    const clearForm = () => {
        setNamaWallet('');
        setNoHp('');
        setQrCode('');
        setId('');
        setIsEdit(false);
    }
    async function getData() {
        await apiService.getEwallet().then((response) => {
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
                                <h1>Ewallet</h1>
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
                                    Tambah Ewallet
                                </Button>
                            </AnimateButton>
                            </Grid>
                </Grid>
                <MUIDataTable
                                elevation='0'
                                title={"Ewallet List"}
                                data={data}
                                options={{
                                    filterType: 'string',
                                }}
                                columns={columns}/>
           </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tambah Waller</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Tambahkan list wallet anda.
                    </DialogContentText>
                    <Divider sx={{
                        mt:3, mb:3
                    }} light />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nama Wallet"
                    type="text"
                    value={nama_wallet}
                    fullWidth
                    variant="outlined"
                    onChange={handleChangeNamaWallet}
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="Nomor Hp"
                    type="text"
                    value={nomor_hp}
                    fullWidth
                    onChange={handleNoHp}
                    variant="outlined"
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="QR Code"
                    type="text"
                    fullWidth
                    value={qr_code}
                    onChange={handleChangeQrCode}
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
                    Apakah anda yakin ingin hapus data <b>{nama_wallet}</b>?.
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