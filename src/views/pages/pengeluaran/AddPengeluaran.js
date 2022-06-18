import { DatePicker, LocalizationProvider } from "@mui/lab";
import { Typography, Card, Divider, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button} from "@mui/material";
import React from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from "react-router";
import service from "../../../services/api";

const AddPengeluaran = (props) => {
    const navigate = useNavigate();

    const [nama_pengeluaran, setNamaPengeluaran] = React.useState('');
    const [satuan, setSatuan] = React.useState('');
    const [jumlah, setJumlah] = React.useState('');
    const [harga, setHarga] = React.useState('');
    const [keterangan, setKeterangan] = React.useState('');
    const [date, setDate] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const data = {
            nama_pengeluaran: nama_pengeluaran,
            satuan: satuan,
            jumlah: jumlah,
            harga: harga,
            keterangan: keterangan,
            date: date
        }
        service.addPengeluaran(data).then(res=>{
            handleClose();
            navigate('/pengeluaran');
        }).catch(err=>{
            console.log(err);
        })
       
    }

    const handleChangeNamaPengeluaran = (event) => {
        setNamaPengeluaran(event.target.value);
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

    const handleChangeKeterangan = (event) => {
        setKeterangan(event.target.value);
    }


    return (
        <div>
             <Typography variant="h3" component="h4">
                    Tambah Pengeluaran
             </Typography>
             <p>Isilah form dibawah ini dengan benar</p>;
             <Card variant="elevation" sx={{p: 3 }}>
                 <div className='flex flex-row gap-3 items-center'>
                    <i className='fa fa-user'></i>
                    <div className='font-bold text-black'>Detail Pengeluaran</div>
                 </div>
                 <Divider sx={{my:2}} light />
                 <div className='flex mt-3 md:mt-6'>
                    <TextField id="outlined-basic" value={nama_pengeluaran} onChange={handleChangeNamaPengeluaran} fullWidth size='medium' label="Nama Pengeluaran" variant="outlined" required/>
                 </div>
                 <div className='flex mt-3 md:mt-8 flex-col md:flex-row gap-3 md:gap-8'>
                     <div className='flex-1'>
                     <TextField id="outlined-basic" value={satuan} onChange={handleChangeSatuan} fullWidth size='medium' label="Satuan" variant="outlined" required/>
                        
                     </div>
                     <div className='flex-1'>
                        <TextField id="outlined-basic" type={'number'} value={jumlah} onChange={handleChangeJumlah} fullWidth size='medium' label="Jumlah" variant="outlined" required/>
                     </div>
                 </div>
                 <div className='flex mt-3 md:mt-8 flex-col md:flex-row gap-3 md:gap-8'>
                    <div className='flex-1'>
                        <TextField id="outlined-basic" type={'number'} value={harga} onChange={handleChangeHarga} fullWidth size='medium' label="Harga" variant="outlined" required/>
                    </div>
                    <div className='flex-1'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Tanggal"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </LocalizationProvider>
                    </div>
                 </div>
                 <div className='mt-3 md:mt-8'>
                    <TextField id="outlined-basic" onChange={handleChangeKeterangan} value={keterangan} multiline rows={2} maxRows={4} fullWidth size='medium' label="Keterangan" variant="outlined" required/>
                 </div>
             </Card>;
             <div className='flex mt-3 md:mt-6 items-end justify-end flex-row'>
                <div className='flex flex-row  gap-3 flex-1 md:flex-none'>
                    <button onClick={() => navigate(-1)} className='px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1'>Batal</button>
                    <button onClick={()=>handleClickOpen()} className='px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1'>Simpan</button>
                </div>
             </div>
             <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Simpan Customer"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    apakah anda yakin ingin menyimpan pengeluaran ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button color="error" onClick={handleClose}>Batal</Button>
                <Button color="primary" onClick={handleSubmit} autoFocus>
                    Simpan
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddPengeluaran;