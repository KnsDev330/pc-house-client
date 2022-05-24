import './App.css';
import { ToastContainer } from 'react-toastify';
import Header from './Components/Shared/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Shared/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Shared/Login/Login';
import Register from './Components/Shared/Register/Register';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './Components/Shared/ResetPassword/ResetPassword';
import Reviews from './Components/Shared/Reviews/Reviews';
import Dashboard from './Components/Shared/Dashboard/Dashboard';

function App() {
    return (
        <div className="App flex flex-col min-h-screen">
            <ToastContainer /> {/* Toast Container */}

            <Header />
            <Routes>
                <Route path='' element={<Home />}></Route>
                <Route path='login' element={<Login />}></Route>
                <Route path='register' element={<Register />}></Route>
                <Route path='reset-password' element={<ResetPassword />}></Route>
                <Route path='reviews' element={<Reviews />}></Route>
                <Route path='dashboard'>
                    <Route index element={<Dashboard />} />
                    <Route path='profile' element={<Footer />} />
                </Route>
            </Routes>
            <Footer />

        </div>
    );
}

export default App;
