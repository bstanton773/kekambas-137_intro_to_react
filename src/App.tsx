// import React from 'react';
import Navigation from './components/Navigation';


export default function App(){
    const username:string = 'brians';
    const isLoggedIn:boolean = true;

    const posts: {id:number, title:string}[] = [
        {id: 1, title: 'Happy Monday!'},
        {id: 2, title: 'React rules!'},
        {id: 3, title: 'How was your weekend?'}
    ]

    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} />
            <h1>{ isLoggedIn ? 'Hello ' + username : 'Hello and Welcome' }</h1>
            { posts.map( p =>  <h4 key={p.id}>{p.title}</h4> ) }
        </div>
    )
}