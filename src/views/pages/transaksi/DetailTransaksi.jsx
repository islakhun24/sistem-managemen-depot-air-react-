/* eslint-disable no-restricted-globals */
import { Card, Typography, Divider, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import service from "../../../services/api";

const DetailTransaksi = (props) =>{
    const [transaksi, setTransaksi] = useState({});
    const {id} = useParams()
    const navigate = useNavigate()
   const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };
   
    const handleDialogOpen = async () =>{
        setOpen(true);
    }

    const handleDialogOpenSubmit = async () => {
        await service.deleteTransaksi(id);
        setOpen(false);
        navigate('/transaksi')
    }
    useEffect(()=>{
        service.detailTransaksi(id).then(response=>{
            console.log(response);
            setTransaksi(response.data)
        })
    }, [id])

    const sendWhatsapp =()=>{
        let pengiriman = transaksi?.metode_pengiriman === 'di_antar' ?  'Diantar' : 'Ambil Sendiri'
        let payment = transaksi?.payment_methods === 'bank_transfer' ? 'Bank Transfer': (
            transaksi?.payment_methods === 'e_wallet' ? 'E-Wallet' : (
                transaksi?.payment_methods === 'cash' ? 'Cash' : 'Tidak ada'
            ))

        const text = `Order From Depot Air Minum Mekarsari\n
        ${new Date(transaksi.date).getTime()} (${transaksi.date.split('T')[0]})\n
        \n

        Nama customer:\n
        ${transaksi.customer.nama_customer}\n
        \n
        Barang : \n
        Nama Barang:${transaksi.barang.nama_barang}\n
        Satuan:${transaksi.barang.satuan}\n
        Harga @barang:${transaksi.barang.harga}\n
        Jumlah:${transaksi.jumlah}\n
        Subtotal : Rp${transaksi?.total_harga}\n
        \n
        Metode Pengiriman : ${pengiriman}\n
        Biaya Antar : Rp${transaksi?.biaya_pengantaran ? 'Rp.' +transaksi?.biaya_pengantaran: "-"}\n
        
        Payment : ${payment}\n
        

        Total Biaya: Rp${transaksi?.total_biaya}\n
        Terima kasih sudah berbelanja.\n`

        location.href=`https://api.whatsapp.com/send?text=${text}&phone=${transaksi.customer.nohp_customer}`
    }
  
    return (
        <>
            <Typography variant="h3" component="h4">
                Detail Transaksi
            </Typography>;
            <Card sx={{p: 3}}>
            <div className="flex flex-row gap-3 items-center">
                <i className="fa fa-user"></i>
                <div className="font-bold text-black">Info Customer</div>
            </div>
            <Divider sx={{ my: 2 }} light />
            <div className="flex mt-3 md:mt-6 flex-col md:flex-row gap-3 md:gap-8">
          <div className="flex-1">
            <TextField
                id="outlined-basic"
                fullWidth
                disabled
                value={transaksi?.customer?.nama_customer || '-'}
                size="medium"
                label="Nomor HP"
                variant="outlined"
                />
          </div>
          <div className="flex-1">
            <TextField
              id="outlined-basic"
              fullWidth
              value={transaksi?.customer?.nohp_customer || '-'}
              size="medium"
              disabled
              label="Nomor HP"
              variant="outlined"
            />
          </div>
        </div>
        <div className="mt-3 md:mt-8">
          <TextField
            id="outlined-basic"
            multiline
            rows={2}
            value={transaksi?.customer?.alamat_customer || '-'}
            maxRows={4}
            disabled
            fullWidth
            size="medium"
            label="Alamat Customer"
            variant="outlined"
          />
        </div>
            </Card>;
            <Card sx={{p: 3}}>
            <div className="flex flex-row gap-3 items-center">
                <i className="fa fa-user"></i>
                <div className="font-bold text-black">Info Transaksi</div>
            </div>
            <Divider sx={{ my: 2 }} light />
            <div className="w-full flex flex-col justify-end">
                <div className="flex justify-en flex-row w-full">
                {
                    transaksi?.status === 'lunas' ? (
                        <div className='text-white px-16 py-2 items-center text-center justify-center cursor-not-allowed bg-green-500'>
                            Lunas
                        </div>
                    ): (
                    <button onClick={()=>handleDialogOpen(transaksi?.id)} className='py-2 px-16 hover:bg-yellow-600 text-white w-full bg-yellow-500'>
                        Belum Membayar
                    </button>
                    )
                }
                </div>
                <div className="mt-3 flex flex-col gap-2 w-full">
                    <div className="flex flex-row gap-6 justify-between">
                        <div>
                            Nama Produk
                        </div>
                        <div className="font-bold">
                           {transaksi?.barang?.nama_barang}
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 justify-between">
                        <div>
                            Jumlah
                        </div>
                        <div className="font-bold">
                           {`${transaksi?.jumlah} ${transaksi?.barang?.satuan}`}
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 justify-between">
                        <div>
                            Harga Produk
                        </div>
                        <div className="font-bold">
                           @ Rp {transaksi?.barang?.harga},-
                        </div>
                    </div>
                    {
                        transaksi?.metode_pengiriman === 'di_antar' ? (
                            <div className="flex flex-row gap-6 justify-between">
                                <div>
                                    Biaya Pengantaran
                                </div>
                                <div className="font-bold">
                                Rp {transaksi?.biaya_pengantaran},-
                                </div>
                            </div>
                        ):null
                    }
                    <div className="flex flex-row gap-6 justify-between">
                        <div>
                        </div>
                        <div className="font-bold">
                          --------------------------------- +
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 justify-between">
                        <div>
                            Total
                        </div>
                        <div className="font-bold">
                           Rp {transaksi?.total_biaya},-
                        </div>
                    </div>
                    
                </div>
            </div>
            </Card>;
            <Card sx={{p: 3}}>
            <div className="flex flex-row gap-3 items-center">
                <i className="fa fa-user"></i>
                <div className="font-bold text-black">Metode Pembayaran (
                    {
                    transaksi?.payment_methods === 'bank_transfer' ? 'Bank Transfer': (
                        transaksi?.payment_methods === 'e_wallet' ? 'E-Wallet' : (
                            transaksi?.payment_methods === 'cash' ? 'Cash' : 'Tidak ada'
                        )
                    )})</div>
            </div>
            <Divider sx={{ my: 2 }} light />
            {
                    transaksi?.payment_methods === 'bank_transfer' ? 
                    (<>
                        <div>
                            Pembayaran dapat dilakukan melalui <strong>Bank Transfer</strong>. dan kirim pembayaran ke nomor rekening <strong>{transaksi?.bank?.nomor_rekening}</strong> atas nama <strong>{transaksi?.bank?.nama_akun}</strong> di bank <strong>{transaksi?.bank?.nama_bank}</strong> dengan kode bank  <strong>{transaksi?.bank?.kode_bank}</strong> sejumlah <strong>Rp {transaksi?.total_biaya},-</strong>
                        </div>
                    </>)
                    : (
                        transaksi?.payment_methods === 'e_wallet' ? (
                            <>
                             <div>
                            Pembayaran dapat dilakukan melalui <strong>{transaksi?.ewallet?.nama_wallet}</strong>. dan kirim pembayaran ke nomor wallet <strong>{transaksi?.ewallet?.nomor_hp}</strong> sejumlah <strong>Rp {transaksi?.total_biaya},-</strong>
                        </div>
                            </>
                        ) : (
                            transaksi?.payment_methods === 'cash' ? (
                                <>
                                <div>
                                    Pembayaran dapat dilakukan secara <strong>tunai</strong> sejumlah <strong>Rp {transaksi?.total_biaya},-</strong>
                                </div>
                                </>
                            ) : null
                        )
                    )
            }
            </Card>;
            <div className="flex mt-3 md:mt-6 items-end justify-end flex-row">
                <div className="flex flex-row  gap-3 flex-1 md:flex-none">
                <button
                    onClick={() => handleDialogOpen()}
                    className="px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1"
                >
                    Hapus
                </button>
                {/* <button
                    onClick={()=>navigate(`/transaksi/edit/${id}`)}
                    className="px-3 md:px-16 w-auto py-2 rounded bg-blue-600 text-white font-bold flex-1"
                >
                    Edit
                </button> */}
                <button
                    onClick={sendWhatsapp}
                    className="px-3 flex-auto md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold"
                >
                    Kirim Whatsapp
                </button>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Hapus Transaksi"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    apakah anda yakin ingin menghapus transaksi ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button color="primary" onClick={handleClose}>Batal</Button>
                <Button  color="error" onClick={handleDialogOpenSubmit} autoFocus>
                    Hapus
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DetailTransaksi;