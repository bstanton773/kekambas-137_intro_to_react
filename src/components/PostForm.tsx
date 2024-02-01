import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PostFormDataType } from '../types';


type PostFormProps = {
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    newPost: PostFormDataType,
    handleFormSubmit: (e:React.FormEvent) => void,
}

export default function PostForm({ handleChange, newPost, handleFormSubmit }: PostFormProps) {
    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className='text-center'>Create New Post</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control name='title' value={newPost.title} onChange={handleChange} />
                    <Form.Label>Post Body</Form.Label>
                    <Form.Control name='body' value={newPost.body} onChange={handleChange} />
                    <Button className='mt-3 w-100' variant='danger' type='submit'>Create Post</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
