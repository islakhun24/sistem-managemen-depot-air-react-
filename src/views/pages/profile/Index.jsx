import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Card, Divider, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Service from '../../../services/user.service';

const Index = () => {
    const [username, setUsername] = useState('')
    const [password_change_1, setPasswordChange1] = useState('')
    const [password_change_2, setPasswordChange2] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [nama_perusahaan, setNama_perusahaan] = useState('')
    const [alamat_perusahaan, setAlamat_perusahaan] = useState('')
    const [nohp_perusahaan, setNohp_perusahaan] = useState('')
    const [logo_perusahaan, setLogo_perusahaan] = useState('')
    useEffect(()=>{
        Service.detailProfile().then(res=>{
            const {data} = res.data
            console.log(data);
            setUsername(data.username);
            setNama_perusahaan(data.nama_perusahaan);
            setAlamat_perusahaan(data.alamat_perusahaan);
            setNohp_perusahaan(data.nohp_perusahaan);
            setLogo_perusahaan(data.logo_perusahaan);
        }).catch(err=>{
            console.log(err.response);
        })
    }, [])

    const handleChangePasswordChange1 = (e)=>{
        setPasswordChange1(e.target.value)
    }
    const handleChangeUsername = (e)=>{
        setUsername(e.target.value)
    }

    const handleChangePasswordChange2 = (e)=>{
        setPasswordChange2(e.target.value)
    }

    const handleChangePassword1 = (e)=>{
        setPassword1(e.target.value)
    }

    const handleChangePassword2 = (e)=>{
        setPassword2(e.target.value)
    }

    const handleNamaPerusahaan = (event) => {
        setNama_perusahaan(event.target.value)
    }

    const handleNoHpPerusahaan = (event) => {
        setNohp_perusahaan(event.target.value)
    }

    const handleAlamatPerusahaan = (event) => {
        setAlamat_perusahaan(event.target.value)
    }

    const handleSubmitChangeAkun = async (e) =>{
        const data = {
            username: username, password1:password1, password2:password2
        }
        
        if(password1 !== password2){
            alert('password tidak sama')
        }else {
            return await Service.changePasswordAndUsername(data).then(res=>{
                console.log( res.data)
                window.reload()
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    const handleClickInfoCustomer = async (e) =>{
        const data = {
            nama_perusahaan, alamat_perusahaan, nohp_perusahaan
        }
        return await Service.updateProfile(data).then(res=>{
            console.log( res.data)
            window.reload()
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleSubmitChangePassword = async (e) =>{
        const data = {
            password1: password_change_1, password2: password_change_2
        }

        if(password_change_1 !== password_change_2){
            alert('password tidak sama')
        }else {
            return await Service.changePassword(data).then(res=>{
                console.log( res.data)
                window.reload()
            }).catch(err=>{
                console.log(err)
            })
        }
        
    }


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

   
    return (
        <div>
            <Typography variant="h3" component="h4">
                    Profile
            </Typography>
            <p>Lengkipi dan isi form profile</p>;
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8'>
                <div className='col-span-1'>
                    <Card sx={{p:2}}>
                        <div className='relative flex items-center justify-center h-72 bg-gray-100 rounded-lg'>
                            <button className='relative flex items-center justify-center w-12 h-12 bg-green-300 rounded-full'>
                                <i className='fa fa-edit text-white' ></i>
                                <input className='absolute w-full h-full cursor-pointer opacity-0 bg-indigo-300 top-0 bottom-0 left-0 right-0' type="file" name="" id="" />
                            </button>
                        </div>
                    </Card>
                </div>
                <div className='col-span-1 md:col-span-2'>
                    <Card sx={{p:2}}>
                        <div className='flex flex-row gap-3 items-center'>
                            <i className='fa fa-user'></i>
                            <div className='font-bold text-black'>Info Profile</div>
                        </div>
                        <Divider sx={{my:2}} light />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6'>
                                <div className='col-span-1'> <TextField InputProps={{
                                    readOnly: true,
                                }} id="outlined-basic" fullWidth size='medium' label="Username" value={username}  variant="outlined" />
                        </div>
                            <div className='col-span-1'>
                            <TextField id="outlined-basic"   onChange={handleNamaPerusahaan} fullWidth size='medium' label="Nama Perusahaan" value={nama_perusahaan} variant="outlined" />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 mt-3 md:mt-6 md:grid-cols-2 gap-3 md:gap-6'>
                                <div className='col-span-1'> <TextField id="outlined-basic" fullWidth size='medium' label="Nomor HP" variant="outlined" onChange={handleNoHpPerusahaan} value={nohp_perusahaan} />
                        </div>
                        </div>
                        <div className='mt-3 md:mt-6'>
                            <TextField id="outlined-basic" multiline rows={2} maxRows={4} fullWidth size='medium' label="Alamat Customer" value={alamat_perusahaan} onChange={handleAlamatPerusahaan} variant="outlined" />
                        </div>
                        <div className='flex mt-3 md:mt-6 items-end justify-end flex-row'>
                            <div className='flex flex-row  gap-3 flex-1 md:flex-none'>
                                {/* <button className='px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1'>Batal</button> */}
                                <button onClick={handleClickInfoCustomer} className='px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1'>Ubah</button>
                            </div>
                        </div>
                    </Card>;
                    <Card sx={{p:2}}>
                        <div className='flex flex-row gap-3 items-center'>
                            <i className='fa fa-lock'></i>
                            <div className='font-bold text-black'>Ganti Password</div>
                        </div>
                        <Divider sx={{my:2}} light />
                        <div className='mt-3 md:mt-6'>
                            <TextField
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password_change_1}
                                    name="password"
                                    fullWidth
                                    onChange={handleChangePasswordChange1}
                                    variant="outlined"
                                    label="Masukan Password"
                                    inputProps={{
                                        endAdornment: <InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="large">{showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment>
                                        
                                    }}
                                />
                        </div>
                        <div className='mt-3 md:mt-6'>
                            <TextField
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password_change_2}
                                    name="password"
                                    fullWidth
                                    onChange={handleChangePasswordChange2}
                                    inputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        
                                    }}
                                    label="Ulangi Password"
                                />
                        </div>
                        <div className='flex mt-3 md:mt-6 items-end justify-end flex-row'>
                            <div className='flex flex-row  gap-3 flex-1 md:flex-none'>
                                {/* <button className='px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1'>Batal</button> */}
                                <button onClick={handleSubmitChangePassword} className='px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1'>Ubah</button>
                            </div>
                        </div>
                    </Card>;
                    <Card sx={{p:2}}>
                        <div className='flex flex-row gap-3 items-center'>
                            <i className='fa fa-user'></i>
                            <div className='font-bold text-black'>Ganti Username dan Password</div>
                        </div>
                        <Divider sx={{my:2}} light />
                        <div className='mt-3 md:mt-6'> 
                            <TextField id="outlined-basic" fullWidth size='medium' label="Username" value={username} onChange={handleChangeUsername} variant="outlined" />
                        </div>
                        <div className='mt-3 md:mt-6'>
                            <TextField
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password1}
                                    name="password"
                                    fullWidth
                                    onChange={handleChangePassword1}
                                    variant="outlined"
                                    label="Masukan Password"
                                    inputProps={{
                                        endAdornment: <InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="large">{showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment>
                                        
                                    }}
                                />
                        </div>
                        <div className='mt-3 md:mt-6'>
                            <TextField
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password2}
                                    onChange={handleChangePassword2}
                                    name="password"
                                    fullWidth
                                    variant="outlined"
                                    label="Masukan Password"
                                    inputProps={{
                                        endAdornment: <InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="large">{showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment>
                                        
                                    }}
                                />
                        </div>
                        <div className='flex mt-3 md:mt-6 items-end justify-end flex-row'>
                            <div className='flex flex-row  gap-3 flex-1 md:flex-none'>
                                {/* <button className='px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1'>Batal</button> */}
                                <button onClick={handleSubmitChangeAkun} className='px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1'>Ubah</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Index;