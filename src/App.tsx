import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import AlertMessage from './components/AlertMessage';
import { CategoryType, UserType } from './types';



export default function App(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null);

    const [message, setMessage] = useState<string|null>(null)
    const [category, setCategory] = useState<CategoryType|null>(null)

    const logUserIn = (user:UserType) => {
        setIsLoggedIn(true);
        setLoggedInUser(user)
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
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} currentUser={loggedInUser} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/>} />
                    <Route path='/signup' element={<SignUp flashMessage={flashMessage} />} />
                </Routes>
            </Container>
        </div>
    )
}