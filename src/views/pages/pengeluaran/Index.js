import {
  Typography,
  Card,
  DialogActions,
  SearchIcon,
  DialogContentText,
  Button,
  Pagination,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import service from "../../../services/api";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [namaPengeluaran, setNamaPengeluaran] = React.useState("");
  const [tanggalDari, setTanggalDari] = React.useState("");
  const [tanggalDariDownload, setTanggalDariDownload] = React.useState("");
  const [tanggalSampai, setTanggalSampai] = React.useState("");
  const [tanggalSampaiDownload, setTanggalSampaiDownload] = React.useState("");
  const [formdata, setFormdata] = React.useState({});
  const [openPrint, setOpenPrint] = React.useState(false);

  const fetchData = useCallback(async (frmData) => {
    const response = await service.getPengeluaran(frmData);
    return response;
  }, []);

  useEffect(() => {
    fetchData(null)
      .then((response) => {
        setPengeluaran(response.data.pengeluaran);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [fetchData]);

  const handleClose = () => {
    setOpen(false);
  };
  const handlePagination = (event) => {
    setPage(event.target.value);
    let fromDate = null;
    let toDate = null;

    if (tanggalDari) {
      fromDate = tanggalDari.split("/").reverse().join("-");
    }

    if (tanggalSampai) {
      toDate = tanggalSampai.split("/").reverse().join("-");
    }

    const formdata = {
      page: page,
      size: 15,
      nama_pengeluaran: namaPengeluaran,
      fromDate,
      toDate,
    };

    fetchData(formdata)
      .then((response) => {
        setPengeluaran(response.data.pengeluaran);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDialogDelete = async (id) => {
    setOpen(true);
    setId(id);
  };
  const handleDelete = async () => {
    await service.deletePengeluaran(id);
    fetchData()
      .then((response) => {
        setPengeluaran(response.data.pengeluaran);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setOpen(false);
      });
  };
  const handleSubmitDownload = (e) => {
    let fromDate = null;
    let toDate = null;

    if (tanggalDariDownload) {
      fromDate = tanggalDariDownload.split("/").reverse().join("-");
    }

    if (tanggalSampaiDownload) {
      toDate = tanggalSampaiDownload.split("/").reverse().join("-");
    }
    const formdata = {
      toDate,
      fromDate,
    };
    service
      .downloadPengeluaran(formdata)
      .then((response) => {
        setTanggalDariDownload(false);
        setTanggalSampaiDownload(false);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", `${Date.now()}.xlsx`);

        document.body.appendChild(link);
        link.click();

        link.remove();
        setOpenPrint(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    let fromDate = null;
    let toDate = null;

    if (tanggalDari) {
      fromDate = tanggalDari.split("/").reverse().join("-");
    }

    if (tanggalSampai) {
      toDate = tanggalSampai.split("/").reverse().join("-");
    }

    const formdata = {
      page: page,
      size: 15,
      nama_pengeluaran: namaPengeluaran,
      fromDate,
      toDate,
    };

    fetchData(formdata)
      .then((response) => {
        setPengeluaran(response.data.pengeluaran);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleClear = (e) => {
    setNamaPengeluaran("");
    setTanggalDari("");
    setTanggalSampai("");
    setPage(0);
    fetchData(null)
      .then((response) => {
        setPengeluaran(response.data.pengeluaran);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const openPrintHandle = (e) => {
    setOpenPrint(true);
  };
  return (
    <div>
      <Typography variant="h3" component="h4">
        Laporan Pengeluaran
      </Typography>
      ;
      <Card variant="elevation" sx={{ p: 3 }}>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          <div className="col-span-1 items-center md:col-span-2 grid-col-1 gap-3 grid md:grid-cols-3">
            <div className="col-span-1 items-center">
              <div className="w-full items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                <input
                  type="text"
                  placeholder="Cari nama pengeluaran"
                  className="w-full focus:outline-none"
                  name=""
                  onChange={(e) => {
                    setNamaPengeluaran(e.target.value);
                  }}
                  id=""
                />
                <button>
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
            <div className="col-span-1 items-center md:col-span-2 ">
              <div className="col-span-1 items-center gap-3 grid md:grid-cols-2 grid-cols-1">
                <div className="col-span-1">
                  <div className="w-full items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                    <input
                      pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                      type="date"
                      placeholder="Dari"
                      className="w-full focus:outline-none"
                      name=""
                      onChange={(e) => {
                        setTanggalDari(e.target.value);
                      }}
                      value={tanggalDari}
                      id=""
                    />
                  </div>
                </div>
                <div className="col-span-1 items-center">
                  <div className="w-full items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                    <input
                      pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                      type="date"
                      placeholder="Sampai"
                      className="w-full focus:outline-none"
                      name=""
                      onChange={(e) => {
                        setTanggalSampai(e.target.value);
                      }}
                      value={tanggalSampai}
                      id=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 items-center flex justify-end">
            <div className="flex w-full flex-col md:flex-row gap-3">
              <button
                onClick={handleClear}
                className="px-16 py-2 w-full rounded bg-red-600 text-white font-bold flex-1"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="px-16 py-2 w-full rounded bg-blue-600 text-white font-bold flex-1"
              >
                Cari
              </button>
            </div>
          </div>
        </div>
        <div>
          <hr className="my-5" />
          <div className="flex md:flex-row flex-col gap-3 w-full mt-3 items-end justify-between">
            <button
              onClick={openPrintHandle}
              to="/pengeluaran/add"
              className="px-8 py-2 w-full items-center justify-center md:w-auto text-center rounded bg-yellow-600 text-white font-bold"
            >
              Cetak / Download
            </button>
            <Link
              to="/pengeluaran/add"
              className="px-8 py-2 w-full items-center justify-center md:w-auto text-center rounded bg-green-600 text-white font-bold"
            >
              Tambah +
            </Link>
          </div>
        </div>
        <hr className="my-5" />
        <div className="w-full overflow-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nama Pengeluaran
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Satuan
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Keterangan
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pengeluaran.map((val) => {
                return (
                  <tr key={val.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {val.date}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {val.nama_pengeluaran}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {val.satuan}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {val.jumlah}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {val.harga}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {val.keterangan}
                      </p>
                    </td>
                    <td className="px-5 flex gap-2 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link
                        to={`/pengeluaran/edit/${val.id}`}
                        className="px-4 py-2 rounded bg-green-600 text-white font-bold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          handleDialogDelete(val.id);
                        }}
                        className="px-4 py-2 rounded bg-red-600 text-white font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex md:flex-row flex-col items-center justify-between ">
          <div className="block w-full md:w-auto md:flex flex-row items-start">
            Result: &nbsp;
            <span className="font-medium">{totalItems || "0"}</span>&nbsp; data
          </div>
          <div className="mt-3 md:mt-0 block md:flex">
            <Pagination
              onChange={handlePagination}
              count={totalPages}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Simpan Customer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            apakah anda yakin ingin Hapus pengeluaran ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Batal
          </Button>
          <Button color="error" onClick={handleDelete} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
      <form className="w-1/2">
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openPrint}
          onClose={() => setOpenPrint(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"DOWNLOAD FILE"}</DialogTitle>
          <DialogContent>
            <div>
              <div className="md:flex-row flex-col gap-3 w-full">
                <div className="col-span-1 w-full">
                  <p className="font-bold">Dari</p>
                  <div className="w-full mt-2 items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                    <input
                      pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                      type="date"
                      placeholder="Sampai"
                      className="w-full focus:outline-none"
                      name="fromDate"
                      value={tanggalDariDownload}
                      onChange={(e) => {
                        setTanggalDariDownload(e.target.value);
                      }}
                      id="fromDate"
                    />
                  </div>
                </div>
                <br />
                <div className="col-span-1  w-full">
                  <p className="font-bold">Sampai</p>
                  <div className="w-full mt-2 items-center flex flex-row gap-2 rounded border border-gray-200 px-3 py-2">
                    <input
                      pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                      type="date"
                      placeholder="Sampai"
                      onChange={(e) => {
                        setTanggalSampaiDownload(e.target.value);
                      }}
                      value={tanggalSampaiDownload}
                      className="w-full focus:outline-none"
                      name="toDate"
                      id="toDate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPrint(false)}>Batal</Button>
            <Button onClick={handleSubmitDownload} autoFocus>
              Download
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default Index;
