import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';
import storage from './services/local-storage.service'
// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ==============================|| APP ||============================== //



const App = () => {
    let navigate = useNavigate();
    const customization = useSelector((state) => state.customization);
    const user = storage.getUser();
    console.log('user', user);
    useEffect(()=>{
        if(!user){
            return navigate("/auth/login");
        }
    },[user])
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
