// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
 import logo from '../assets/images/logo.png';
// ==============================|| LOGO SVG ||============================== //

const Logo = (props) => {
    const {width=30} = props
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
       <>
        <img src={logo} alt="logo" width={width} />
       </>
    );
};

export default Logo;
