import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

let theme = createMuiTheme({
    palette: {
        primary: {
            main:'#F1C40F',
            mainLight: '#F1C40F40',
            red: '#FF000080',
            green: '#60F38380'
      },
        secondary:{
            main:'#000000'
        }
    },
    typography: {
        
        // this will overwrite all h2's
        h2: {
            fontFamily: "Poppins",
            fontWeight: "700",
            fontSize: 35,
        },
    
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Open Sans"',
          'Poppins',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },

      menuitems: {

      }


});
theme = responsiveFontSizes(theme);
export default theme;