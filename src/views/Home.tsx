import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { UserType } from '../types';


type Post = {
    id:number,
    title:string
}

type HomeProps = {
    isLoggedIn:boolean,
    currentUser: UserType|null
}

export default function Home({ isLoggedIn, currentUser }: HomeProps) {

    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<Post>({id: 1, title: ''})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, event.target.name);
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setPosts([...posts, newPost])
        setNewPost({id: posts.length + 2, title: ''})
    }

    return (
        <>
            <h1>{ isLoggedIn ? 'Welcome back ' + currentUser!.username : 'Hello and Welcome' }</h1>
            <PostForm handleChange={handleInputChange} newPost={newPost} handleFormSubmit={handleFormSubmit} />
            { posts.map( p =>  <PostCard post={p} key={p.id} /> ) }
        </>
    )
}
