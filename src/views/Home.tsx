import Button from 'react-bootstrap/Button';
import PostCard from '../components/PostCard';

type HomeProps = {
    isLoggedIn:boolean,
    handleClick:()=>void
}

export default function Home({ handleClick, isLoggedIn }: HomeProps) {
    const username:string = 'brians';

    const posts: {id:number, title:string}[] = [
        {id: 1, title: 'Happy Monday!'},
        {id: 2, title: 'React rules!'},
        {id: 3, title: 'How was your weekend?'}
    ]

    return (
        <>
            <Button variant='primary' onClick={handleClick}>Click Me</Button>
            <h1>{ isLoggedIn ? 'Hello ' + username : 'Hello and Welcome' }</h1>
            { posts.map( p =>  <PostCard post={p} key={p.id} /> ) }
        </>
    )
}
