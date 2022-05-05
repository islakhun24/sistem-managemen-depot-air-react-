import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import service from '../../../services/api'
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
    const [value, setValue] = useState('today');
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;
    const [newChartData, setnewChartData] = useState(chartData)
    const [category, setCategory] = useState([])
    const [pemasukan, setPemasukan]= useState([])  
    const [pengeluaran, setPengeluaran]= useState([])  
    const fetchData = useCallback(async () => {
        const response = await service.chartDashboard();
        return response;
      }, []);

      useEffect(() => {
        fetchData().then(res=>{
            console.log(res.data);
            const {data} = res
            setPemasukan(data?.pemasukan)
            setPengeluaran(data?.pengeluaran)
            chartData.series = [
                {
                    name: 'Pemasukan',
                    data: data?.pemasukan,
                    color: '#1e88e5'
                },
                {
                    name: 'Pengeluaran',
                    data: data?.pengeluaran,
                    color: '#c62828'
                }
            ]
        })
      },[fetchData])
    
    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Grafik Keuangan</Typography>
                                        </Grid>
                                        <Grid item>
                                            {/* <Typography variant="h3">$2,324.00</Typography> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
