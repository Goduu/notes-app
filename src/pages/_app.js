import '@fontsource/roboto';
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../../styles/theme";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import { ThemeProvider } from '@material-ui/core';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>

  )
}

export default MyApp
