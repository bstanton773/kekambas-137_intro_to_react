import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import AlertMessage from './components/AlertMessage';
import { CategoryType } from './types';



export default function App(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [message, setMessage] = useState<string|null>(null)
    const [category, setCategory] = useState<CategoryType|null>(null)


    const handleClick = () => {
        // console.log('The button has been clicked!');
        setIsLoggedIn(!isLoggedIn)
    }

    const flashMessage = (newMessage:string|null, newCategory:CategoryType|null) => {
        setMessage(newMessage);
        setCategory(newCategory);
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} />
            <Container>
                {message && <AlertMessage message={message} category={category} flashMessage={flashMessage}/>}
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} handleClick={handleClick} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} />} />
                    <Route path='/signup' element={<SignUp flashMessage={flashMessage} />} />
                </Routes>
            </Container>
        </div>
    )
}