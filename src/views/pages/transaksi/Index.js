import { Typography, Card, Paper, IconButton, MenuIcon, InputBase, SearchIcon, Divider, DirectionsIcon, Pagination } from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

        return (
            <div>
                <Typography variant="h3" component="h4">
                    Transaksi
                </Typography>;
                <Card variant="elevation" sx={{p: 3 }}>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-8'>
                        <div className='col-span-1'>
                            <div className='w-full flex flex-row gap-2 rounded border border-gray-200 px-3 py-2'>
                                <input type="text" placeholder='Search' className='w-full focus:outline-none' name="" id="" />
                                <button>
                                    <i className='fa fa-search'/>
                                </button>
                            </div>
                        </div>
                        <div className='col-span-1'>

                        </div>
                        <div className='col-span-1 flex justify-end'>
                             <div>
                             <Link to="/transaksi/add" className='px-8 py-2 rounded bg-green-600 text-white font-bold flex-1'>Tambah +</Link>
                            </div>
                        </div>
                    </div>
                    <hr className='my-5' />
                    
                    <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-4'>
                        {
                            data.map(val=>{
                                return (
                                    <Link key={val} to="/" className='col-span-1 p-3 hover:bg-purple-200 rounded border border-gray-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                                        <div className='flex justify-between flex-row'>
                                                <div className='flex items-center flex-row gap-3'>
                                                    <div className='rounded-full bg-purple-300 h-8 w-8 items-center justify-center flex'>
                                                        <p className='text-md font-bold text-purple-600'>IN</p>
                                                    </div>
                                                    <div className='flex flex-col'> 
                                                        <div className='text-md text-black font-semibold'>Islakhun Nur Dzaki</div>
                                                        <div>Purbalingga</div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col items-end justify-end'>
                                                    <div className='font-semibold text-green-600 '>Rp.200,000,-</div>
                                                    <div className='text-md text-gray-400 '>Bank transfer</div>
                                                </div>
                                        </div>

                                        <hr className='my-3 w-full'/>
                                        <div className='flex flex-row justify-between items-center'>
                                            <div className='text-xs text-indigo-500 font-semibold bg-indigo-100 px-1.5 py-0.5 rounded'>
                                                Di antar
                                            </div>
                                            <div className='text-xs font-normal'>
                                                Rabu, 22 Maret 2022 11:20 Wib
                                            </div>
                                        </div>
                                        <div className='flex flex-col  mt-3 rounded bg-gray-100 p-3'>
                                            <div className='flex flex-row justify-between items-center'>
                                                <div className='flex flex-col text-xs'>
                                                    <div className='font-semibold text-black'>Galon isi ulang</div>
                                                    <div>@ Rp. 5500,-</div>
                                                </div>
                                                <div className='flex flex-col text-xs'>
                                                    <div className='font-semibold text-black'>2 lt</div>
                                                </div>
                                            </div>
                                            <hr className='my-3'/>
                                            <div className='flex justify-end items-end text-xs font-semibold text-black'>
                                                Rp. 11,000,-
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        
                    </div>
                    <div className='mt-3 flex md:flex-row flex-col items-center justify-between '>
                        <div className='block w-full md:w-auto md:flex flex-row items-start'>
                            Result: &nbsp; <span className='font-medium'>1-15</span> &nbsp;dari &nbsp;<span className='font-medium'>1000</span>&nbsp; data
                        </div>
                        <div className='mt-3 md:mt-0 block md:flex'>
                        <Pagination count={10} variant="outlined" shape="rounded" />
                        </div>
                    </div>
                </Card>

            </div>
        );
}

export default Index;