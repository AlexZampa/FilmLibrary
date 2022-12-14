import { Navbar, Form, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Film, PersonCircle } from 'react-bootstrap-icons';

function NavBarApp(props) {
    return (
        <Navbar expand="lg" bg="primary" variant="dark" fixed="top">
            <Navbar.Brand href="#home">
                <Film color="white" size={25} />
                <span> Film Library</span>
            </Navbar.Brand>
            <Navbar.Collapse>
                <Form className='mx-auto'>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Search" />
                    </Form.Group>
                </Form>
            </Navbar.Collapse>
            <Navbar.Brand href="#account" className='justify-content-end logout-text'>
                <PersonCircle className='person-circle' color='white' size={25} />
                <Button size='sm' onClick={props.logout}>
                    logout
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-" viewBox="-4 -1 20 20">
                        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                        <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                    </svg>
                </Button>
            </Navbar.Brand>
        </Navbar>
    )
};


export { NavBarApp };