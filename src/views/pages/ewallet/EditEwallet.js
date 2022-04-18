import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import service from "../../../services/api";

const EditWallet = (props) =>{
    const [nama_wallet, setNamaWallet] = useState('');
    const [nomor_hp, setNomorHP] = useState('');
    const [qr_code, setQrCode] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const { id } = useParams();
    useEffect(()=>{
        service.getEwalletById(id).then(res=>{
            const {data} = res.data
            setNamaWallet(data.nama_wallet)
            setNomorHP(data.nomor_hp)
            setQrCode(data.qr_code)
        }).catch(err=>{
            console.log(err);
            alert('error')
        })
    }, [id])
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeNamaWallet = (e) =>{
        setNamaWallet(e.target.value);
    }

    const handleNoHP = (e) =>{
        setNomorHP(e.target.value);
        setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${e.target.value}`)
    }
    

    const handleSubmit = () => {
        const data = {
            nama_wallet,
            nomor_hp,
            qr_code,
        }
        service.updateEwallet(id, data).then(res=>{
            handleClose();
            navigate('/ewallet');
        }).catch(err=>{
            console.log(err);
        })
       
    }
    return(
        <div>
            <Typography variant="h3" component="h4">
                    Tambah Ewallet
             </Typography>
             <p>Isilah form dibawah ini dengan benar</p>;
             <div className="grid grid-cols-1 gap-3">
                <div className="col-span-1 ">
                <Card variant="elevation" sx={{p: 3 }}>
                 <div className='flex flex-row gap-3 items-center'>
                    <i className='fa fa-user'></i>
                    <div className='font-bold text-black'>Form Ewallet</div>
                 </div>
                 <Divider sx={{my:2}} light />
                 <div className='flex flex-col gap-4'>
                    <TextField id="outlined-basic" fullWidth size='medium' label="Nama Wallet" onChange={handleChangeNamaWallet} value={nama_wallet} variant="outlined" />
                    <TextField id="outlined-basic" fullWidth size='medium' label="Nomor HP" onChange={handleNoHP} value={nomor_hp} variant="outlined" />
                    <p className="font-bold">
                        QR CODE
                    </p>
                    <img src={qr_code || 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg'} alt="qr_code" width="200px" height="200px" />
                    <div className='flex flex-row justify-end gap-3'>
                        <button onClick={()=>() => navigate(-1)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                            Batal
                        </button>
                        <button onClick={handleClickOpen} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            Simpan
                        </button>
                    </div>
                 </div>
                 
             </Card>;
                </div>
             </div>
             <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Simpan Ewallet"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    apakah anda yakin ingin menyimpan Ewallet ?
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

export default EditWallet;