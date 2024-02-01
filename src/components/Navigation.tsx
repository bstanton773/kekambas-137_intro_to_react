import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

type NavigationProps = {
    isLoggedIn: boolean,
    handleClick: () => void
}

export default function Navigation({ isLoggedIn, handleClick }: NavigationProps) {
    // console.log(isLoggedIn);
    return (
        <Navbar expand='lg' bg='dark' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand as={Link} to='/'>Kekambas Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id="nav-collapse">
                    <Nav className='me-auto'>
                        { isLoggedIn ? (
                            <>
                                <Nav.Link href='/'>Create Post</Nav.Link>
                                <Nav.Link as={Link} to='/' onClick={handleClick}>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                                <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
