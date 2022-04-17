import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import service from "../../../services/api";

const AddBank = (props) =>{
    const [nama_bank, setNamaBank] = useState('');
    const [no_rek, setNoRek] = useState('');
    const [code_bank, setCodeBank] = useState('');
    const [nama_pemilik, setNamaPemilik] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeNamaBank = (e) =>{
        setNamaBank(e.target.value);
    }

    const handleChangeNoRek = (e) =>{
        setNoRek(e.target.value);
    }
    
    const handleChangeCodeBank = (e) =>{
        setCodeBank(e.target.value);
    }

    const handleChangeNamaPemilik = (e) =>{
        setNamaPemilik(e.target.value);
    }
    const handleSubmit = () => {
        const data = {
            nama_bank: nama_bank,
            nomor_rekening: no_rek,
            kode_bank: code_bank,
            nama_akun: nama_pemilik,
        }
        service.addBank(data).then(res=>{
            handleClose();
            navigate('/bank');
        }).catch(err=>{
            console.log(err);
        })
       
    }
    return(
        <div>
            <Typography variant="h3" component="h4">
                    Tambah Bank
             </Typography>
             <p>Isilah form dibawah ini dengan benar</p>;
             <div className="grid grid-cols-1 gap-3 md:gap-8 md:grid-cols-2">
                <div className="col-span-1">
                    <div className="w-full rounded-md p-6 bg-white flex flex-col">
                    <div className="w-full text-left font-bold text-2xl text-black">
                        { nama_bank || 'Nama Bank' }
                    </div>
                    <div className="w-full mt-8 text-center font-bold text-4xl text-black">
                        { no_rek || '0000 0000 0000 0000' }
                    </div>
                    <div className="w-full mt-8 flex justify-between flex-row">
                        <div className="flex flex-col space-y-1">
                            <div className="text-base font semibold">Atas Nama</div>
                            <div className="text-lg font-bold text-black"> { nama_pemilik || 'Nama Anda' }</div>
                        </div>
                        <div className="flex flex-col space-y-1">
                        <div className="text-base font semibold">Kode Bank</div>
                            <div className="text-lg font-bold text-black">{ code_bank || '000' }</div>
                        </div>
                    </div>
                    </div>;
                    <p>Catatan:</p>
                    <p>- Pastikan data yang anda masukkan benar</p>
                </div>
                <div className="col-span-1 ">
                <Card variant="elevation" sx={{p: 3 }}>
                 <div className='flex flex-row gap-3 items-center'>
                    <i className='fa fa-user'></i>
                    <div className='font-bold text-black'>Form Bank</div>
                 </div>
                 <Divider sx={{my:2}} light />
                 <div className='flex flex-col gap-4'>
                    <TextField id="outlined-basic" fullWidth size='medium' label="Nama Bank" onChange={handleChangeNamaBank} value={nama_bank} variant="outlined" />
                    <TextField id="outlined-basic" fullWidth size='medium' label="Nomor Rekening" onChange={handleChangeNoRek} value={no_rek} variant="outlined" />
                    <TextField id="outlined-basic" onChange={handleChangeCodeBank} value={code_bank} fullWidth size='medium' label="Code Bank" variant="outlined" />
                    <TextField id="outlined-basic" fullWidth size='medium' label="Atas Nama" onChange={handleChangeNamaPemilik} value={nama_pemilik} variant="outlined" />

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
                {"Simpan Bank"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    apakah anda yakin ingin menyimpan bank ?
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

export default AddBank;