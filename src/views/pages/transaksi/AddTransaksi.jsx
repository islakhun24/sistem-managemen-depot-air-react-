import { Autocomplete, Card, Divider, Radio, TextField, Typography } from '@mui/material'
import React, { useEffect, useState, useCallback} from 'react'
import service from '../../../services/api'
const AddTransaksi = () => {
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
          title: 'The Lord of the Rings: The Return of the King',
          year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
          title: 'The Lord of the Rings: The Fellowship of the Ring',
          year: 2001,
        },
        {
          title: 'Star Wars: Episode V - The Empire Strikes Back',
          year: 1980,
        },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        {
          title: 'The Lord of the Rings: The Two Towers',
          year: 2002,
        },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        {
          title: 'Star Wars: Episode IV - A New Hope',
          year: 1977,
        },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
        { title: 'Casablanca', year: 1942 },
        { title: 'City Lights', year: 1931 },
        { title: 'Psycho', year: 1960 },
        { title: 'The Green Mile', year: 1999 },
        { title: 'The Intouchables', year: 2011 },
        { title: 'Modern Times', year: 1936 },
        { title: 'Raiders of the Lost Ark', year: 1981 },
        { title: 'Rear Window', year: 1954 },
        { title: 'The Pianist', year: 2002 },
        { title: 'The Departed', year: 2006 },
        { title: 'Terminator 2: Judgment Day', year: 1991 },
        { title: 'Back to the Future', year: 1985 },
        { title: 'Whiplash', year: 2014 },
        { title: 'Gladiator', year: 2000 },
        { title: 'Memento', year: 2000 },
        { title: 'The Prestige', year: 2006 },
        { title: 'The Lion King', year: 1994 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Sunset Boulevard', year: 1950 },
        {
          title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
          year: 1964,
        },
        { title: 'The Great Dictator', year: 1940 },
        { title: 'Cinema Paradiso', year: 1988 },
        { title: 'The Lives of Others', year: 2006 },
        { title: 'Grave of the Fireflies', year: 1988 },
        { title: 'Paths of Glory', year: 1957 },
        { title: 'Django Unchained', year: 2012 },
        { title: 'The Shining', year: 1980 },
        { title: 'WALL·E', year: 2008 },
        { title: 'American Beauty', year: 1999 },
        { title: 'The Dark Knight Rises', year: 2012 },
        { title: 'Princess Mononoke', year: 1997 },
        { title: 'Aliens', year: 1986 },
        { title: 'Oldboy', year: 2003 },
        { title: 'Once Upon a Time in America', year: 1984 },
        { title: 'Witness for the Prosecution', year: 1957 },
        { title: 'Das Boot', year: 1981 },
        { title: 'Citizen Kane', year: 1941 },
        { title: 'North by Northwest', year: 1959 },
        { title: 'Vertigo', year: 1958 },
        {
          title: 'Star Wars: Episode VI - Return of the Jedi',
          year: 1983,
        },
        { title: 'Reservoir Dogs', year: 1992 },
        { title: 'Braveheart', year: 1995 },
        { title: 'M', year: 1931 },
        { title: 'Requiem for a Dream', year: 2000 },
        { title: 'Amélie', year: 2001 },
        { title: 'A Clockwork Orange', year: 1971 },
        { title: 'Like Stars on Earth', year: 2007 },
        { title: 'Taxi Driver', year: 1976 },
        { title: 'Lawrence of Arabia', year: 1962 },
        { title: 'Double Indemnity', year: 1944 },
        {
          title: 'Eternal Sunshine of the Spotless Mind',
          year: 2004,
        },
        { title: 'Amadeus', year: 1984 },
        { title: 'To Kill a Mockingbird', year: 1962 },
        { title: 'Toy Story 3', year: 2010 },
        { title: 'Logan', year: 2017 },
        { title: 'Full Metal Jacket', year: 1987 },
        { title: 'Dangal', year: 2016 },
        { title: 'The Sting', year: 1973 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: "Singin' in the Rain", year: 1952 },
        { title: 'Toy Story', year: 1995 },
        { title: 'Bicycle Thieves', year: 1948 },
        { title: 'The Kid', year: 1921 },
        { title: 'Inglourious Basterds', year: 2009 },
        { title: 'Snatch', year: 2000 },
        { title: '3 Idiots', year: 2009 },
        { title: 'Monty Python and the Holy Grail', year: 1975 },
      ];
      const [customers, setCustomers] = useState([]);
      const [nama_customer, setNamaCustomer] = useState('');

      const fetchDataCustomer = useCallback(async () => {
        const response = await service.getCustomerTransaksi(nama_customer);
        return response;
      }, [nama_customer]);
      
      useEffect(() => {
            fetchDataCustomer().then(res => {
                setCustomers(res.data);
            }, err => {
                console.log(err);
            })
      },[fetchDataCustomer])
    return (
        <div>
             <Typography variant="h3" component="h4">
                    Tambah Transaksi
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
                     <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            value={nama_customer}
                            onChange={(event, newValue) => {
                                console.log(JSON.stringify(newValue, null, ' '));
                            }}
                            
                            // inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                console.log(newInputValue);
                            }}
                            options={customers && customers.map( (option) =>  option.nama_customer)}
                            renderInput={(params) => <TextField {...params} label="Nama Customer" />}
                    />
                        
                     </div>
                     <div className='flex-1'>
                        <TextField id="outlined-basic" fullWidth size='medium' label="Nomor HP" variant="outlined" />
                     </div>
                 </div>
                 <div className='mt-3 md:mt-8'>
                    <TextField id="outlined-basic" multiline rows={2} maxRows={4} fullWidth size='medium' label="Alamat Customer" variant="outlined" />
                 </div>
             </Card>;
             <Card variant="elevation" sx={{p: 3 }}>
                 <div className='flex flex-row gap-3 items-center'>
                    <i className='fa fa-briefcase'></i>
                    <div className='font-bold text-black'>Informasi Produk</div>
                 </div>
                 <Divider sx={{my:2}} light />
             </Card>;
             <Card variant="elevation" sx={{p: 3 }}>
                 <div className='flex flex-row gap-3 items-center'>
                    <i className='fa fa-bank'></i>
                    <div className='font-bold text-black'>Payment Methods</div>
                 </div>
                 <Divider sx={{my:2}} light />
                 <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8'>
                    <div className='col-span-1 items-start justify-start flex flex-row gap-3 border rounded border-gray-200 p-3'>
                        <Radio
                            checked={true}
                            onChange={()=>{}}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            />
                        <div className='flex flex-col'>
                            <div className='font-bold'>Bank</div>
                            <div className='font-light'>Pembayaran dilakukan melalui bank atau nomor rekening</div>
                        </div>
                    </div>
                    <div className='col-span-1 items-start justify-start flex flex-row gap-3 border rounded border-gray-200 p-3'>
                        <Radio
                            checked={false}
                            onChange={()=>{}}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            />
                        <div className='flex flex-col'>
                            <div className='font-bold'>E-Wallet</div>
                            <div className='font-light'>Pembayaran dilakukan melalui E-Wallet atau Elektronik</div>
                        </div>
                    </div>
                    <div className='col-span-1 items-start justify-start flex flex-row gap-3 border rounded border-gray-200 p-3'>
                        <Radio
                            checked={false}
                            onChange={()=>{}}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            />
                        <div className='flex flex-col'>
                            <div className='font-bold'>Cash</div>
                            <div className='font-light'>Pembayaran dilakukan secara cash atau tunai.</div>
                        </div>
                    </div>
                 </div>
             </Card>;
             <Card variant="elevation" sx={{p: 3 }}>
                 <div className='flex flex-row gap-3 items-center'>
                    <i className='fa fa-truck'></i>
                    <div className='font-bold text-black'>Jenis Pengiriman</div>
                 </div>
                 <Divider sx={{my:2}} light />
                 <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8'>
                    <div className='col-span-1 items-start justify-start flex flex-row gap-3 border rounded border-gray-200 p-3'>
                        <Radio
                            checked={true}
                            onChange={()=>{}}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            />
                        <div className='flex flex-col'>
                            <div className='font-bold'>Diantar</div>
                            <div className='font-light'>Jenis pengiriman lewat antar di bebankan harga sekitar Rp. 2500,-/Galon</div>
                        </div>
                    </div>
                    <div className='col-span-1 items-start justify-start flex flex-row gap-3 border rounded border-gray-200 p-3'>
                        <Radio
                            checked={false}
                            onChange={()=>{}}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            />
                        <div className='flex flex-col'>
                            <div className='font-bold'>Ambil sendiri</div>
                            <div className='font-light'>Jenis pengiriman lewat ambil sendiri tidak dikenakan biaya sepersenpun.</div>
                        </div>
                    </div>
                 </div>
             </Card>
             <div className='flex mt-3 md:mt-6 items-end justify-end flex-row'>
                <div className='flex flex-row  gap-3 flex-1 md:flex-none'>
                    <button className='px-3 md:px-16 w-auto py-2 rounded bg-red-600 text-white font-bold flex-1'>Batal</button>
                    <button className='px-3 md:px-16 w-auto py-2 rounded bg-green-600 text-white font-bold flex-1'>Simpan</button>
                </div>
             </div>
        </div>
    )
}

export default AddTransaksi