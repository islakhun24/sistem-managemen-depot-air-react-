
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack, TextField } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import apiService from '../../../services/api';


const Index = (props)=>{
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [nama_akun, setNamaAkun] = React.useState('');
    const [nomor_rekening, setNomorRekening] = React.useState('');
    const [kode_bank, setKodeBank] = React.useState('');
    const [nama_bank, setNamaBank] = React.useState('');
    const [id, setId] = React.useState('');
    const [data, setData] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(true);
    const columns = [
        {
          label: "Nama Akun",
          name: "nama_akun",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Nomor Rekening",
          name: "nomor_rekening",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Kode",
          name: "kode_bank",
          options: {
            filter: true,
            sort: true,
           }
        },
        {
          label: "Nama Bank",
          name: "nama_bank",
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
                                        setNamaAkun(tableMeta.rowData[0]);
                                        setNomorRekening(tableMeta.rowData[1]);
                                        setKodeBank(tableMeta.rowData[2]);
                                        setNamaBank(tableMeta.rowData[3]);
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
                                        setNamaAkun(tableMeta.rowData[0]);
                                        setNomorRekening(tableMeta.rowData[1]);
                                        setKodeBank(tableMeta.rowData[2]);
                                        setNamaBank(tableMeta.rowData[3]);
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
        apiService.deleteBank(id).then(res=>{
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
    const handleChangeNamaAkun = (event) => {
        setNamaAkun(event.target.value);
    }
    const handleNomorRekening = (event) => {
        setNomorRekening(event.target.value);
    }
    const handleChangeKodeBank = (event) => {
        setKodeBank(event.target.value);
    }
    const handleChangeNamaBank = (event) => {
        setNamaBank(event.target.value);
    }
    const handleClose = () => {
        clearForm();
        setOpen(false);
    };
    const handleSubmit = () => {
        const formData = {
            nama_akun, nomor_rekening, kode_bank, nama_bank
        }
        if(isEdit===true){
            apiService.updateBank(id, formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }else {
            apiService.addBank(formData).then(res=>{
                console.log(res);
                setOpen(false);
                getData();
                clearForm();
            })
        }
        
    }

    const clearForm = () => {
        setNamaAkun('');
        setNomorRekening('');
        setKodeBank('');
        setNamaBank('');
        setId('');
        setIsEdit(false);
    }
    async function getData() {
        await apiService.getBank().then((response) => {
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
            <MainCard title="BANK" secondary={
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            size="md"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            onClick={handleClickOpen}>
                            Tambah Bank
                        </Button>
                    </AnimateButton>
                }>
                  <MUIDataTable
                        title={"Employee List"}
                        data={data}
                        options={{
                            filterType: 'string',
                        }}
                        columns={columns}/>

                   
            </MainCard>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tambah Bank</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Tambahkan list bank anda.
                    </DialogContentText>
                    <Divider sx={{
                        mt:3, mb:3
                    }} light />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nama Akun"
                    type="text"
                    value={nama_akun}
                    fullWidth
                    variant="outlined"
                    onChange={handleChangeNamaAkun}
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="Nomor Rekening"
                    type="text"
                    value={nomor_rekening}
                    fullWidth
                    onChange={handleNomorRekening}
                    variant="outlined"
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="Kode Bank"
                    type="text"
                    fullWidth
                    value={kode_bank}
                    onChange={handleChangeKodeBank}
                    variant="outlined"
                    />
                    <TextField
                    sx={{
                        mt: 2
                    }}
                    margin="dense"
                    id="name"
                    label="Nama Bank"
                    type="text"
                    value={nama_bank}
                    onChange={handleChangeNamaBank}
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
                    Apakah anda yakin ingin hapus data <b>{nama_akun}</b>?.
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