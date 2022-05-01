import { Card, Typography } from "@mui/material";

const DetailTransaksi = (props) =>{
    const {id} = props

    return (
        <>
            <Typography variant="h3" component="h4">
                Detail Transaksi
            </Typography>;
            <Card>
                Heloo
            </Card>;
            <div className="flex mt-3 md:mt-6 items-end justify-end flex-row">
                <div className="flex flex-row  gap-3 flex-1 md:flex-none">
                <button
                    onClick={() => null}
                    className="px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1"
                >
                    Hapus
                </button>
                <button
                    onClick={null}
                    className="px-3 md:px-16 w-auto py-2 rounded bg-blue-600 text-white font-bold flex-1"
                >
                    Edit
                </button>
                <button
                    onClick={null}
                    className="px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1"
                >
                    Kirim Whatsapp
                </button>
                </div>
            </div>
        </>
    )
}

export default DetailTransaksi;