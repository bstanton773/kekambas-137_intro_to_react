import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type Post = {
    id:number,
    title:string
}

type PostCardProps = {
    post: Post
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{ post.title }</Card.Title>
                <Card.Text>This is the body of the post</Card.Text>
                <Button variant='success'>Do Something</Button>
            </Card.Body>
        </Card>
    )
}
