import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import service from '../../../services/api'
// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useNavigate } from 'react-router';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();
    const navigate = useNavigate()


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [query, setQuery] = useState('');
    const [transaksi, setTransaksi]= useState([]);
    const fetchData = useCallback(async () => {
        const response = await service.getTransaksi(query);
        return response;
      }, [query]);
      
        useEffect(()=>{
            fetchData().then(res=>{
                const {data} = res
                setTransaksi(data.transaksi)
            })
        },[fetchData])
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Riwayat Transaksi</Typography>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12} sx={{mt:1}}>
                                {
                                     transaksi?.map((val, i)=>{
                                        return (
                                            <>
                                            <Grid key={i} container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    {val?.barang?.nama_barang}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            Rp {val?.total_biaya},-
                                                        </Typography>
                                                    </Grid>
                                                    
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction={'row'}>
                                        <Grid item>
                                            <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                                {`${val?.jumlah} ${val?.barang?.satuan}`}
                                            </Typography>
                                        </Grid>
                                        <Grid item sx={{mt:1}}>
                                            <div className={val?.status ==='lunas' ? 'flex rounded-md py-1 text-xs w-auto  text-green-500': 'flex py-1 rounded-md  text-xs w-auto text-yellow-500'}>
                                            { val?.status ==='lunas' ? 'Lunas' : 'Belum Bayar' }
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                            </>
                                        )
                                    })
                                }
                               
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button onClick={()=>navigate('/transaksi')} size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
