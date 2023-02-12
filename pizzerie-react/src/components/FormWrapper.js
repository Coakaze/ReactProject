import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth-context";

const FormWrapper = (props) => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { Register, Login } = useAuth();

    const handleForm = async (event) => {
        event.preventDefault();
        setError("");
        try {
            if (props.isLogin) {
                await Login(email, password);
                navigate("/home");
            }
            else {
                await Register(email, password);
                navigate("/login");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <Container className="mt-5">
            {!props.isLogin && <h1 className="mb-4">Create an account!</h1>}
            {props.isLogin && <h1 className="mb-4">Log in to place an order!</h1>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        onChange={handleEmailChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        onChange={handlePasswordChange} />
                </Form.Group>
                {!props.isLogin && <Button variant="primary" type="submit">
                    Register
                </Button>}
                {props.isLogin && <Button variant="primary" type="submit">
                    Login
                </Button>}
            </Form>
            <div className="p-4 box mt-3">
                {!props.isLogin && <Link to="/login">Login if you already have an account!</Link>}
                {props.isLogin && <Link to="/register">Register if you don't have an account!</Link>}
            </div>
        </Container>
    );
}

export default FormWrapper;