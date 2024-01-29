import { useState } from 'react';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';



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
                <Home isLoggedIn={isLoggedIn} handleClick={handleClick} />
            </Container>
        </div>
    )
}