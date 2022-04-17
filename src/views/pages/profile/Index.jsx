import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Card, Divider, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Service from '../../../services/user.service';

const Index = () => {
    const [username, setusername] = useState(null)
    const [password, setpassword] = useState(null)
    const [nama_perusahaan, setnama_perusahaan] = useState(null)
    const [alamat_perusahaan, setalamat_perusahaan] = useState(null)
    const [nohp_perusahaan, setnohp_perusahaan] = useState(null)
    const [logo_perusahaan, setlogo_perusahaan] = useState(null)

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(()=>{
        Service.detailProfile().then(res=>{
            const {data} = res.data
            setusername(data.username);
            setpassword(data.password);
            setnama_perusahaan(data.nama_perusahaan);
            setalamat_perusahaan(data.alamat_perusahaan);
            setnohp_perusahaan(data.nohp_perusahaan);
            setlogo_perusahaan(data.logo_perusahaan);
        }).catch(err=>{
            console.log(err.response);
        })
    }, [username, password, nama_perusahaan, alamat_perusahaan, nohp_perusahaan, logo_perusahaan])
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
                                }} id="outlined-basic" fullWidth size='medium' label="Username" defaultValue={username}  variant="outlined" />
                        </div>
                            <div className='col-span-1'>
                            <TextField id="outlined-basic" fullWidth size='medium' label="Nama Perusahaan" defaultValue={nama_perusahaan} variant="outlined" />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 mt-3 md:mt-6 md:grid-cols-2 gap-3 md:gap-6'>
                                <div className='col-span-1'> <TextField id="outlined-basic" fullWidth size='medium' label="Nomor HP" variant="outlined" defaultValue={nohp_perusahaan} />
                        </div>
                        </div>
                        <div className='mt-3 md:mt-6'>
                            <TextField id="outlined-basic" multiline rows={2} maxRows={4} fullWidth size='medium' label="Alamat Customer" defaultValue={alamat_perusahaan} variant="outlined" />
                        </div>
                        <div className='flex mt-3 md:mt-6 items-end justify-end flex-row'>
                            <div className='flex flex-row  gap-3 flex-1 md:flex-none'>
                                <button className='px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1'>Batal</button>
                                <button className='px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1'>Simpan</button>
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
                                    value={password}
                                    name="password"
                                    fullWidth
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
                                    value={password}
                                    name="password"
                                    fullWidth
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
                                <button className='px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1'>Batal</button>
                                <button className='px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1'>Simpan</button>
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
                            <TextField id="outlined-basic" fullWidth size='medium' label="Username" defaultValue={username}  variant="outlined" />
                        </div>
                        <div className='mt-3 md:mt-6'>
                            <TextField
                                    id="outlined-adornment-password-login"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    name="password"
                                    fullWidth
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
                                    value={password}
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
                                <button className='px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1'>Batal</button>
                                <button className='px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1'>Simpan</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Index