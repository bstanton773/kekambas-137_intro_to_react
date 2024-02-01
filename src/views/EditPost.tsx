import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, editPostById, deletePostById } from '../lib/apiWrapper';
import { CategoryType, PostFormDataType, UserType } from '../types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


type EditPostProps = {
    currentUser: UserType|null,
    flashMessage: (message:string, category:CategoryType) => void
}

export default function EditPost({ currentUser, flashMessage }: EditPostProps) {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [postToEditData, setPostToEditData] = useState<PostFormDataType>({title:'', body:''})
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    
    useEffect( () => {
        async function getPost(){
            let response = await getPostById(postId!);
            if (response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else if (response.data) {
                const postToEdit = response.data
                if (postToEdit.userId !== currentUser?.id){
                    flashMessage('You do not have permission to edit this post', 'danger');
                    navigate('/')
                } else {
                    setPostToEditData({ title: postToEdit.title, body: postToEdit.body})
                }
            }
        }
        getPost();
    }, [ postId ] );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostToEditData({...postToEditData, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editPostById(token, postId!, postToEditData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${response.data?.title} has been updated`, 'success');
            navigate('/')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deletePostById(token, postId!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'primary')
            navigate('/')
        }
    }


    return (
        <>
            <h1 className="text-center">Edit Post</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name='title' value={postToEditData.title} onChange={handleInputChange} />
                        <Form.Label>Body</Form.Label>
                        <Form.Control name='body' value={postToEditData.body} onChange={handleInputChange} />
                        <Button variant='success' className='mt-3 w-50' type='submit'>Edit Post</Button>
                        <Button variant='danger' className='mt-3 w-50' onClick={openModal}>Delete Post</Button>
                    </Form>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {postToEditData.title}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {postToEditData.title}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
