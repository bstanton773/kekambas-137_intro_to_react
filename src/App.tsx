import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';



export default function App(){

    // const isLoggedIn:boolean = true;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // console.log(isLoggedIn);
    // console.log(typeof setIsLoggedIn);

    const handleClick = () => {
        // console.log('The button has been clicked!');
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} />
            <Container>
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} handleClick={handleClick} />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
            </Container>
        </div>
    )
}