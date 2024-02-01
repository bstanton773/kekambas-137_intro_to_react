import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { PostType } from '../types';


type PostCardProps = {
    post: PostType
}

export default function PostCard({ post }: PostCardProps) {

    const [showComments, setShowComments] = useState(false);

    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>{ post.title }</Card.Title>
                <Card.Subtitle>{ post.author.username }</Card.Subtitle>
                <Card.Text>{ post.body }</Card.Text>
                <Button variant='success' onClick={() => setShowComments(!showComments) }>{showComments ? 'Hide' : 'Show ' + post.comments.length } Comments</Button>
            </Card.Body>
            { showComments && (
                <ListGroup className='list-group-flush'>
                    { post.comments.map( comment => <ListGroup.Item key={comment.id}>{comment.body} By: {comment.user.username} </ListGroup.Item> )}
                </ListGroup>
            ) }
        </Card>
    )
}
