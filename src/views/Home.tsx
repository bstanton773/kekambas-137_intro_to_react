import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { CategoryType, PostFormDataType, PostType, UserType } from '../types';
import { getAllPosts, createPost } from '../lib/apiWrapper';


type HomeProps = {
    isLoggedIn:boolean,
    currentUser: UserType|null,
    flashMessage: (message:string, category:CategoryType) => void
}

export default function Home({ isLoggedIn, currentUser, flashMessage }: HomeProps) {

    const [posts, setPosts] = useState<PostType[]>([]);
    const [newPost, setNewPost] = useState<PostFormDataType>({title: '', body: ''})
    const [displayForm, setDisplayForm] = useState(false);
    const [fetchPostData, setFetchPostData] = useState(true)

    useEffect( () => {
        async function fetchData(){
            const response = await getAllPosts();
            console.log(response);
            if (response.data){
                let posts = response.data;
                posts.sort( (a, b) => (new Date(a.dateCreated) > new Date(b.dateCreated)) ? -1 : 1)
                setPosts(posts)
            }
        }

        fetchData();
    }, [fetchPostData] )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value, event.target.name);
        setNewPost({...newPost, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const token = localStorage.getItem('token') || '';
        const response = await createPost(token, newPost);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${response.data?.title} has been created`, 'success');
            setNewPost({title:'', body:''})
            setDisplayForm(false);
            setFetchPostData(!fetchPostData);
        }

    }

    return (
        <>
            <h1 className='text-center'>{ isLoggedIn && currentUser?.username ? 'Welcome back ' + currentUser.username : 'Hello and Welcome' }</h1>
            { isLoggedIn && <Button className='w-100 mb-3' variant='outline-primary' onClick={() => setDisplayForm(!displayForm)}>{ displayForm ? 'Hide Form' : '+Add Post'} </Button> }
            { displayForm && <PostForm handleChange={handleInputChange} newPost={newPost} handleFormSubmit={handleFormSubmit} />}
            { posts.map( p =>  <PostCard post={p} key={p.id} currentUser={currentUser} /> ) }
        </>
    )
}
