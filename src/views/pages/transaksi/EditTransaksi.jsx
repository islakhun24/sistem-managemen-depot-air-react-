import {
    Card,
    Divider,
    Radio,
    TextField,
    Button,
    Typography,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
  } from "@mui/material";
  import React, { useEffect, useState, useCallback } from "react";
  import service from "../../../services/api";
  import { useNavigate, useParams } from "react-router";
  import CustomAutocompleteCustomer from "ui-component/CustomAutocompleteCustomer";
  import CustomAutocompleteBarang from "ui-component/CustomAutocompleteBarang";
  import {
    alamat_customerKey,
    idKey,
    idProductKey,
    nama_barangKey,
    nama_customerKey,
    hargaKey,
    nohp_customerKey,
  } from "constants/key";
  import { jenis_pengirimans, payments_methods } from "data/data";
  import CustomAutocompleteBank from "ui-component/CustomAutocompleteBank";
  import { DatePicker, LocalizationProvider } from "@mui/lab";
  import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
  import CustomAutocompleteWallet from "ui-component/CustomAutocompleteWallet";
  
  const EditTransaksi = (props) => {
    const {id} = useParams()

    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [barang, setBarangs] = useState([]);
    const [banks, setBanks] = useState([]);
    const [wallets, setWallets] = useState([]);
    //CUSTOMER
    const [alamat_customer, setAlamatCustomer] = useState("");
    const [nama_customer, setNamaCustomer] = useState("");
    const [nohp_customer, setNohpCustomer] = useState("");
  
    const [open, setOpen] = useState(false);
  
    //PRODUCT
    const [nama_barang, setNamaBarang] = useState("");
    const [harga_barang, setHargaBarang] = useState("");
  
    //BANKS
    const [nama_bank, setNamaBank] = useState("");
    const [jumlah_uang, setJumlahUang] = useState("");
    //Wallet
    const [nama_wallet, setNamaWallet] = useState("");
  
    //FORMDATA
    const [id_barang, setIdBarang] = useState("");
    const [idCustomer, setIdCustomer] = useState("");
    const [payment_methods, setPaymentMethods] = useState("bank_transfer");
    const [date, setDate] = useState("");
    const [bank_id, setBankId] = useState("");
    const [wallet_id, setWalletId] = useState("");
    const [jumlah, setJumlah] = useState(0);
    const [metode_pengiriman, setMetodePengiriman] = useState("");
    const [biaya_pengantaran, setBiayaPengantaran] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const fetchData = useCallback(async () => {
        const response = await service.detailTransaksi(id);
        return response;
      }, [id]);

    useEffect(()=>{
        fetchData().then(response=>{
            
            const {data} = response
            console.log('response', data);
            setIdBarang(data?.barang?.id)
            setIdCustomer(data?.customer?.id)
            setPaymentMethods(data?.payment_methods)
            setDate(data?.date)
            setBankId(data?.bank?.id)
            setWalletId(data?.ewallet?.id)
            setMetodePengiriman(data?.metode_pengiriman);
            setBiayaPengantaran(data?.biaya_pengantaran)
            setKeterangan(data?.keterangan)
            setAlamatCustomer(data?.customer?.alamat_customer);
            setNamaCustomer(data?.customer?.nama_customer);
            setNohpCustomer(data?.customer?.nohp_customer)
            setJumlah(data?.jumlah)
            setJumlahUang(data?.jumlah_uang)
        })
        const formData = {
            id_barang,
            idCustomer,
            payment_methods,
            date,
            bank_id,
            wallet_id,
            metode_pengiriman,
            biaya_pengantaran,
            keterangan,
            alamat_customer,
            nama_customer,
            nohp_customer,
            jumlah,
            jumlah_uang
          };

          console.log('formData', formData);
    }, [fetchData, id_barang,
        idCustomer,
        payment_methods,
        date,
        bank_id,
        wallet_id,
        metode_pengiriman,
        biaya_pengantaran,
        keterangan,
        alamat_customer,
        nama_customer,
        nohp_customer,
        jumlah,
        jumlah_uang])

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };
  
    const fetchDataCustomer = useCallback(async () => {
      const response = await service.getCustomerTransaksi(nama_customer);
      return response;
    }, [nama_customer]);
  
    const fetchDataBarang = useCallback(async () => {
      const response = await service.getBarangsTransaksi(nama_barang);
      return response;
    }, [nama_barang]);
  
    const fetchDataBank = useCallback(async () => {
      const response = await service.getBanksTransaksi(nama_bank);
      return response;
    }, [nama_bank]);
  
    const fetchDataWallet = useCallback(async () => {
      const response = await service.getWalletTransaksi(nama_wallet);
      return response;
    }, [nama_wallet]);
  
    useEffect(() => {
      fetchDataCustomer().then(
        (res) => {
          setCustomers(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }, [fetchDataCustomer]);
  
    useEffect(() => {
      fetchDataBarang().then(
        (res) => {
          setBarangs(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }, [fetchDataBarang]);
  
    useEffect(() => {
      fetchDataBank().then(
        (res) => {
          setBanks(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }, [fetchDataBank]);
  
    useEffect(() => {
      fetchDataWallet().then(
        (res) => {
            console.log(res);
          setWallets(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }, [fetchDataWallet]);
  
    const handleSubmitForm = (e) => {
      const formData = {
        id_barang,
        idCustomer,
        payment_methods,
        date,
        bank_id,
        wallet_id,
        metode_pengiriman,
        biaya_pengantaran,
        keterangan,
        alamat_customer,
        nama_customer,
        nohp_customer,
        jumlah,
        jumlah_uang
      };
      service.postTransaksi(formData).then(response=>{
        console.log(response)
      })
      // const response =  service.post('/transaksi', formData)
    };
  
    const onInputChange = (e, value) => {
      setNamaCustomer(value);
    };
  
    const handleNoHp = (e, value) => {
      setNohpCustomer(value);
    };
  
    const handleAlamat = (e, value) => {
      setAlamatCustomer(value);
    };
    const handleJumlah = (e, value) => {
      setJumlah(e.target.value);
    };
    const onInputChangeBarang = (e, value) => {
      setNamaBarang(value);
    };
    const handleChange = (e, value) => {
      // what to do here?
      if (value) {
        setNamaCustomer(value[nama_customerKey]);
        setAlamatCustomer(value[alamat_customerKey]);
        setNohpCustomer(value[nohp_customerKey]);
        setIdCustomer(value[idKey]);
      }else{
          setIdCustomer(null);
          setNamaCustomer(value[nama_customerKey]);
          setAlamatCustomer(value[alamat_customerKey]);
          setNohpCustomer(value[nohp_customerKey]);
          setIdCustomer(value[idKey]);
      }
    };
    const handleChangeBarang = (e, value) => {
      setNamaBarang(value);
      // what to do here?
      if (value) {
        setIdBarang(value[idProductKey]);
        setNamaBarang(value[nama_barangKey]);
        setHargaBarang(value[hargaKey]);
      }
    };
    const handleChangeBank = (e, value) => {
      setNamaBank(value);
      // what to do here?
      if (value) {
        setBankId(value[idProductKey]);
      } else {
        setBankId(null);
      }
    };
    const handleChangeWallet = (e, value) => {
      setNamaWallet(value);
      // what to do here?
      if (value) {
        setWalletId(value[idProductKey]);
      } else {
        setWalletId(null);
      }
    };
    const onInputChangeBank = (e, value) => {
      setNamaBank(value);
    };
    return (
      <div>
        <Typography variant="h3" component="h4">
          Tambah Transaksi
        </Typography>
        <p>Isilah form dibawah ini dengan benar</p>;
        <Card variant="elevation" sx={{ p: 3 }}>
          <div className="flex flex-row gap-3 items-center">
            <i className="fa fa-user"></i>
            <div className="font-bold text-black">Info Customer</div>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex mt-3 md:mt-6 flex-col md:flex-row gap-3 md:gap-8">
            <div className="flex-1">
              <CustomAutocompleteCustomer
                onChange={handleChange}
                label="Nama Customer"
                defaultValue={nama_customer}
                options={customers}
                onInputChange={onInputChange}
              />
            </div>
            <div className="flex-1">
              <TextField
                id="outlined-basic"
                onChange={handleNoHp}
                fullWidth
                value={nohp_customer}
                size="medium"
                label="Nomor HP"
                variant="outlined"
              />
            </div>
          </div>
          <div className="mt-3 md:mt-8">
            <TextField
              id="outlined-basic"
              onChange={handleAlamat}
              multiline
              rows={2}
              value={alamat_customer}
              maxRows={4}
              fullWidth
              size="medium"
              label="Alamat Customer"
              variant="outlined"
            />
          </div>
        </Card>
        ;
        <Card variant="elevation" sx={{ p: 3 }}>
          <div className="flex flex-row gap-3 items-center">
            <i className="fa fa-briefcase"></i>
            <div className="font-bold text-black">Informasi Produk</div>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="flex mt-3 md:mt-6 flex-col md:flex-row gap-3 md:gap-8">
            <div className="flex-1">
              <CustomAutocompleteBarang
                onChange={handleChangeBarang}
                defaultValue={nama_barang}
                options={barang}
                label="Nama Barang"
                onInputChange={onInputChangeBarang}
              />
            </div>
            <div className="flex-1">
              <TextField
                id="outlined-basic"
                onChange={handleJumlah}
                fullWidth
                value={jumlah}
                size="medium"
                label="Jumlah Barang"
                variant="outlined"
              />
            </div>
          </div>
          {
            jumlah > 0 ? (
              <>
              <Divider sx={{ my: 2 }} light />
              <div className='flex flex-col'>
                <div className="flex flex-row justify-between items-center">
                  <div>Nama Barang</div>
                  <div>{nama_barang || '' }</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div>Harga Barang</div>
                  <div>{harga_barang || '' }</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div>Total Harga</div>
                  <div>{`${harga_barang * jumlah} (${harga_barang} x ${jumlah})`}</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div>Jumlah Uang</div>
                  <div>{jumlah_uang || '' }</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div></div>
                  <div>--------------------------- -</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div>Kembalian</div>
                  <div>{jumlah_uang - (harga_barang * jumlah)}</div>
                </div>
              </div>
              </>
            ): null
          }
        </Card>
        ;
        <Card variant="elevation" sx={{ p: 3 }}>
          <div className="flex flex-row gap-3 items-center">
            <i className="fa fa-bank"></i>
            <div className="font-bold text-black">Payment Methods</div>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {payments_methods.map((val, i) => {
              return (
                <div
                  key={val.id}
                  className="col-span-1 items-start justify-start flex flex-row gap-3 border rounded border-gray-200 p-3"
                >
                  <Radio
                    checked={payment_methods === val.id}
                    onChange={(e) => {
                      setPaymentMethods(e.target.value);
                    }}
                    value={val.id}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <div className="flex flex-col">
                    <div className="font-bold">{val.name}</div>
                    <div className="font-light">{val.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            {payment_methods === "bank_transfer" ? (
              <>
                <Divider sx={{ my: 2 }} light />
                <CustomAutocompleteBank
                  onChange={handleChangeBank}
                  defaultValue={nama_bank}
                  options={banks}
                  label="Nama Bank"
                  onInputChange={onInputChangeBank}
                />
              </>
            ) : payment_methods === "e_wallet" ? (
              <>
                <Divider sx={{ my: 2 }} light />
                <CustomAutocompleteWallet
                  onChange={handleChangeWallet}
                  defaultValue={nama_wallet}
                  options={wallets}
                  label="Nama Wallet"
                  onInputChange={(e) => {
                    setNamaWallet(e.target.value);
                  }}
                />
              </>
            ) : payment_methods === "cash" ? (
              <>
                <Divider sx={{ my: 2 }} light />
                <TextField
                  id="outlined-basic"
                  onChange={(e) => {
                    setJumlahUang(e.target.value);
                  }}
                  fullWidth
                  value={jumlah_uang}
                  size="medium"
                  label="Jumlah Uang"
                  variant="outlined"
                />
              </>
            ) : null}
          </div>
          <div></div>
        </Card>
        ;
        <Card variant="elevation" sx={{ p: 3 }}>
          <div className="flex flex-row gap-3 items-center">
            <i className="fa fa-truck"></i>
            <div className="font-bold text-black">Jenis Pengiriman</div>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {jenis_pengirimans.map((val, i) => {
              return (
                <div
                  key={val.id}
                  className="col-span-1 items-start justify-start flex flex-row gap-3 border rounded border-gray-200 p-3"
                >
                  <Radio
                    checked={metode_pengiriman === val.id}
                    onChange={(e) => {
                      setMetodePengiriman(e.target.value);
                    }}
                    value={val.id}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <div className="flex flex-col">
                    <div className="font-bold">{val.name}</div>
                    <div className="font-light">{val.desc}</div>
                  </div>
                </div>
              );
            })}
            
          </div>
          {
                metode_pengiriman === 'di_antar' ? 
                (
                  <>
                  <Divider sx={{ my: 2 }} light />
                  <TextField
                    id="outlined-basic"
                    onChange={(e) => {
                      setBiayaPengantaran(e.target.value);
                    }}
                    fullWidth
                    value={biaya_pengantaran}
                    size="medium"
                    label="Biaya Pengantaran"
                    variant="outlined"
                  />
                </>
                ) : null
            }
        </Card>
        ;
        <Card variant="elevation" sx={{ p: 3 }}>
          <div className="flex flex-row gap-3 items-center">
            <i className="fa fa-truck"></i>
            <div className="font-bold text-black">Lainya</div>
          </div>
          <Divider sx={{ my: 2 }} light />
          <div className="grid gap-4 md:gap-8">
        
            <TextField
              id="outlined-basic"
              onChange={(e) => {
                setKeterangan(e.target.value);
              }}
              multiline
              rows={2}
              value={keterangan}
              maxRows={4}
              fullWidth
              size="medium"
              label="Keterangan"
              variant="outlined"
            />
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
        </Card>
        <div className="flex mt-3 md:mt-6 items-end justify-end flex-row">
          <div className="flex flex-row  gap-3 flex-1 md:flex-none">
            <button
              onClick={() => navigate(-1)}
              className="px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1"
            >
              Batal
            </button>
            <button
              onClick={handleClickOpen}
              className="px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1"
            >
              Simpan
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
                  {"Simpan Ewallet"}
                  </DialogTitle>
                  <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      apakah anda yakin ingin menyimpan Transaksi ?
                  </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <Button color="error" onClick={handleClose}>Batal</Button>
                  <Button color="primary" onClick={handleSubmitForm} autoFocus>
                      Simpan
                  </Button>
                  </DialogActions>
              </Dialog>
      </div>
    );
  };
  
  export default EditTransaksi;
  