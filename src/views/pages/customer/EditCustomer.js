import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from '../../../services/api';

const AddCustomer = (props) =>{
    const navigate = useNavigate();

    const [nama_customer, setNamaCustomer] = useState('');
    const [nohp_customer, setNohpCustomer] = useState('');
    const [alamat_customer, setAlamatCustomer] = useState('');
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState({});
    const { id } = useParams();

    const handleChangeNamaCustomer = (e) =>{
        setNamaCustomer(e.target.value);
    }


    useEffect(()=>{
        service.getCustomerById(id).then(res=>{
            const {data} = res.data
            setNamaCustomer(data.nama_customer);
            setNohpCustomer(data.nohp_customer);
            setAlamatCustomer(data.alamat_customer);
        }).catch(err=>{
            console.log(err);
            alert('error')
        })
    }, [detail, id])

    const handleChangeNohpCustomer = (e) =>{
        setNohpCustomer(e.target.value);
    }

    const handleChangeAlamatCustomer = (e) =>{
        setAlamatCustomer(e.target.value);
    }
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () =>{
        const data = {
            nama_customer,
            nohp_customer,
            alamat_customer
        }
        const response = await service.updateCustomer(id,data);
        if(response.status === 200){
            handleClose();
            navigate('/customer');
        } else {
            alert('gagal');
        }

    }
    return (
        <div>
            <Typography variant="h3" component="h4">
                        Tambah Customer
            </Typography>
            <p>Isilah form dibawah ini dengan benar</p>;
            <Card variant="elevation" sx={{p: 3 }}>
                 <div className='flex flex-row gap-3 items-center'>
                    <i className='fa fa-user'></i>
                    <div className='font-bold text-black'>Info Customer</div>
                 </div>
                 <Divider sx={{my:2}} light />
                 <div className='flex mt-3 md:mt-6 flex-col md:flex-row gap-3 md:gap-8'>
                     <div className='flex-1'>
                     <TextField id="outlined-basic" value={nama_customer} onChange={handleChangeNamaCustomer} fullWidth size='medium' label="Nama Customer" variant="outlined" required/>
                        
                     </div>
                     <div className='flex-1'>
                        <TextField id="outlined-basic" value={nohp_customer} onChange={handleChangeNohpCustomer} fullWidth size='medium' label="Nomor HP" variant="outlined" required/>
                     </div>
                 </div>
                 <div className='mt-3 md:mt-8'>
                    <TextField id="outlined-basic" onChange={handleChangeAlamatCustomer} value={alamat_customer} multiline rows={2} maxRows={4} fullWidth size='medium' label="Alamat Customer" variant="outlined" required/>
                 </div>
             </Card>;
             <div className='flex mt-3 md:mt-6 items-end justify-end flex-row'>
                <div className='flex flex-row  gap-3 flex-1 md:flex-none'>
                    <button onClick={() => navigate(-1)} className='px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1'>Batal</button>
                    <button onClick={()=>handleClickOpen()} className='px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1'>Edit</button>
                </div>
             </div>
             <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Edit Customer"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    apakah anda yakin ingin menyimpan customer ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button color="error" onClick={handleClose}>Batal</Button>
                <Button color="primary" onClick={handleSubmit} autoFocus>
                    Edit
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddCustomer;
