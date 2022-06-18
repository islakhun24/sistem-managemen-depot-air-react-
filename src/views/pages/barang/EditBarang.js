import { DatePicker, LocalizationProvider } from "@mui/lab";
import { Typography, Card, Divider, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button} from "@mui/material";
import React, { useEffect } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate, useParams } from "react-router";
import service from "../../../services/api";

const AddBarang = (props) => {
    const navigate = useNavigate();

    const [nama_barang, setNamaBarang] = React.useState('');
    const [satuan, setSatuan] = React.useState('');
    const [jumlah, setJumlah] = React.useState('');
    const [harga, setHarga] = React.useState('');
    const [detail, setDetail] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const { id } = useParams();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        service.getBarangById(id).then(res=>{
            const {data} = res.data
            setNamaBarang(data.nama_barang);
            setSatuan(data.satuan);
            setJumlah(data.jumlah);
            setHarga(data.harga);
        }).catch(err=>{
            console.log(err);
            alert('error')
        })
    }, [detail, id])
    const handleSubmit = () => {
        const data = {
            nama_barang: nama_barang,
            satuan: satuan,
            jumlah: jumlah,
            harga: harga,
        }
        service.updateBarang(id, data).then(res=>{
            handleClose();
            navigate('/barang');
        }).catch(err=>{
            console.log(err);
        })
       
    }

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



    return (
        <div>
             <Typography variant="h3" component="h4">
                    Tambah Barang
             </Typography>
             <p>Isilah form dibawah ini dengan benar</p>;
             <Card variant="elevation" sx={{p: 3 }}>
                 <div className='flex flex-row gap-3 items-center'>
                    <i className='fa fa-user'></i>
                    <div className='font-bold text-black'>Detail Barang</div>
                 </div>
                 <Divider sx={{my:2}} light />
                 <div className='flex mt-3 md:mt-6'>
                    <TextField id="outlined-basic" value={nama_barang} onChange={handleChangeNamaBarang} fullWidth size='medium' label="Nama Barang" variant="outlined" required/>
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
                        <TextField type={'number'} id="outlined-basic" value={harga} onChange={handleChangeHarga} fullWidth size='medium' label="Harga" variant="outlined" required/>
                    </div>
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
                {"Simpan Barang"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    apakah anda yakin ingin menyimpan barang ?
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

export default AddBarang;