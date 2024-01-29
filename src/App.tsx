import { useState } from 'react';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


export default function App(){
    const username:string = 'brians';
    // const isLoggedIn:boolean = true;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // console.log(isLoggedIn);
    // console.log(typeof setIsLoggedIn);

    const posts: {id:number, title:string}[] = [
        {id: 1, title: 'Happy Monday!'},
        {id: 2, title: 'React rules!'},
        {id: 3, title: 'How was your weekend?'}
    ]

    const handleClick = () => {
        // console.log('The button has been clicked!');
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} />
            <Container>
                <Button variant='primary' onClick={handleClick}>Click Me</Button>
                <h1>{ isLoggedIn ? 'Hello ' + username : 'Hello and Welcome' }</h1>
                { posts.map( p =>  <h4 key={p.id}>{p.title}</h4> ) }
            </Container>
        </div>
    )
}