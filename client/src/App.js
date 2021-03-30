import { GlobalProvider } from './Context/GlobalState'
import MyAppRoutes from './Routes/Routes'
import './App.css';
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <GlobalProvider>
      <MuiThemeProvider theme={theme}>
        <MyAppRoutes />
      </MuiThemeProvider>
    </GlobalProvider>
  );
}

export default App;
