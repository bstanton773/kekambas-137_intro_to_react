import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { UserFormDataType, CategoryType } from '../types';
import { login } from '../lib/apiWrapper';


type LoginProps = {
    flashMessage: (newMessage:string|null, newCategory:CategoryType|null) => void
}

export default function Login({ flashMessage }: LoginProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserFormDataType>>({ username: '', password: ''})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        let response = await login(userFormData.username!, userFormData.password!)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            console.log(response.data)
            flashMessage('You have successfully logged in', 'success')
            navigate('/')
        }
    }


    return (
        <>
            <h1 className='text-center'>Log In</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>

                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' placeholder='Enter Username' value={userFormData.username} onChange={handleInputChange}/>

                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type='password' placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' >Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}