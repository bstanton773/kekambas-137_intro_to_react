import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';


type Post = {
    id:number,
    title:string
}

type HomeProps = {
    isLoggedIn:boolean,
    handleClick:()=>void
}

export default function Home({ handleClick, isLoggedIn }: HomeProps) {
    const username:string = 'brians';

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
            <Button variant='primary' onClick={handleClick}>Click Me</Button>
            <h1>{ isLoggedIn ? 'Hello ' + username : 'Hello and Welcome' }</h1>
            <PostForm handleChange={handleInputChange} newPost={newPost} handleFormSubmit={handleFormSubmit} />
            { posts.map( p =>  <PostCard post={p} key={p.id} /> ) }
        </>
    )
}
