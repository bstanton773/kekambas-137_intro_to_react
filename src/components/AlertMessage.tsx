import Alert from 'react-bootstrap/Alert';
import { CategoryType } from '../types';

type AlertMessageProps = {
    message:string|null,
    category:CategoryType|null,
    flashMessage: (newMessage:string|null, newCategory:CategoryType|null)=>void
}

export default function AlertMessage({ message, category, flashMessage }: AlertMessageProps) {
    return (
        <Alert variant={category ?? 'primary'} dismissible onClose={() => {flashMessage(null, null)}}>{ message }</Alert>
    )
}
