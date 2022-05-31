import { useState } from 'react';
import { Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = { username, password };

        props.login(credentials);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
                <FloatingLabel label="Email">
                    <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
                </FloatingLabel>
            </Form.Group>
            <Form.Group controlId='password'>
            <FloatingLabel label="password">
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6} />
                <Form.Control.Feedback type="invalid">
                    password must be at least 6 digit long
                </Form.Control.Feedback>
            </FloatingLabel>
            </Form.Group>

            <Button type="submit">Login</Button>
        </Form>
    )
};

function LogoutButton(props) {
    return (
        <Row>
            <Col>
                <Button variant="outline-primary" onClick={props.logout}>Logout</Button>
            </Col>
        </Row>
    )
}

export { LoginForm, LogoutButton };