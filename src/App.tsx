import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import AlertMessage from './components/AlertMessage';
import { CategoryType, UserType } from './types';
import { getMe } from './lib/apiWrapper';



export default function App(){

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') && new Date() < new Date(localStorage.getItem('tokenExp') as string) ? true : false);
    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null);

    const [message, setMessage] = useState<string|null>(null)
    const [category, setCategory] = useState<CategoryType|null>(null)

    useEffect( () => {
        async function getLoggedInUser(){
            if (isLoggedIn){
                const token = localStorage.getItem('token') as string
                let response = await getMe(token)
                if (response.data){
                    setLoggedInUser(response.data)
                } else {
                    console.error(response.error)
                }
            }
        }
        getLoggedInUser();
    }, [isLoggedIn] )

    const logUserIn = (user:UserType) => {
        setIsLoggedIn(true);
        setLoggedInUser(user)
    }

    const logUserOut = () => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        flashMessage("You have logged out", "primary");
    }

    const flashMessage = (newMessage:string|null, newCategory:CategoryType|null) => {
        setMessage(newMessage);
        setCategory(newCategory);
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} handleClick={logUserOut} />
            <Container>
                {message && <AlertMessage message={message} category={category} flashMessage={flashMessage}/>}
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} currentUser={loggedInUser} flashMessage={flashMessage} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/>} />
                    <Route path='/signup' element={<SignUp flashMessage={flashMessage} />} />
                </Routes>
            </Container>
        </div>
    )
}