import {Navbar, Container, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Film, PersonCircle} from 'react-bootstrap-icons';

function NavBarApp(){
    return(
        <Navbar expand="lg" bg="primary" variant="dark" fixed="top">
            <Navbar.Brand href="#home">
                <Film color="white" size={25}/>
                <span> Film Library</span>
            </Navbar.Brand>
            <Navbar.Collapse>
                <Form className='mx-auto'>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Search"/>
                    </Form.Group>
                </Form>
            </Navbar.Collapse>
                <Navbar.Brand href="#account" className='justify-content-end'>
                    <PersonCircle color='white' size={25}/>
                </Navbar.Brand>    
      </Navbar>
    )
};


export {NavBarApp};