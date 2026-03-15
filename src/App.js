import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Header from './components/Header/Header/Header';
import Home from './components/Home/Home';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Notfound from './components/Notfound/Notfound';
import Footer from './components/Header/Footer/Footer';
import Login from './components/Login/Login/Login';
import Register from './components/Login/Login/Register/Register';
import Authprovider from './Context/Authprovider';
import Doctors from './components/Services/Doctors/Doctors';
import Appointment from './components/Services/Appointment/Appointment';
import PrivetRoute from './PrivetRoute/PrivetRoute';
import { MedicineProvider } from './store/MedicineStore';
import Medicines from './pages/Medicines';

// ✅ Import Nearby Hospitals & Reminders Pages
import NearbyHospitalsPage from './pages/NearbyHospitalsPage';
import Reminders from './pages/Reminders';
import VideoConsultation from './pages/VideoConsultation';
import MedicalHistory from "./components/MedicalHistory/MedicalHistory";

// ✅ Import CartProvider and CartPage
import { CartProvider } from './store/CartContext';
import CartPage from './pages/CartPage/CartPage';  // <-- This line is important!!

// Custom theme for the application
export const myTheme = createTheme({
  palette: {
    primary: { main: '#e91e63' },
    secondary: { main: '#f48fb1' },
    alternate: { main: '#fff' },
    text: { secondary: '#212121' },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
});

function App() {
  return (
    <>
      <Authprovider>
        <MedicineProvider>
          <CartProvider> {/* 🛒 Wrap CartProvider here */}
            <ThemeProvider theme={myTheme}>
              <BrowserRouter>
                <Header />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/home' component={Home} />
                  <PrivetRoute path='/doctors' component={Doctors} />
                  <Route path='/login' component={Login} />
                  <Route path='/register' component={Register} />
                  <Route path='/about' component={About} />
                  <Route path='/profile' component={Login} />
                  <PrivetRoute path='/appointment' component={Appointment} />
                  <Route exact path='/medicines' component={Medicines} />

                  {/* ✅ New Routes */}
                  <Route exact path='/nearby-hospitals' component={NearbyHospitalsPage} />
                  <Route exact path='/reminders' component={Reminders} />
                  <Route exact path='/video-consultation' component={VideoConsultation} />
                  <Route exact path='/medical-history' component={MedicalHistory} />

                  {/* 🛒 Cart Page Route */}
                  <Route exact path='/cart' component={CartPage} />

                  {/* 404 Not Found */}
                  <Route path='*' component={Notfound} />
                </Switch>
                <Footer />
              </BrowserRouter>
            </ThemeProvider>
          </CartProvider>
        </MedicineProvider>
      </Authprovider>
    </>
  );
}

export default App;
