import CartButton from './Cart/CartButton';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from "../store/auth-context";

const NavigationComp = () => {
    const { user, Logout } = useAuth();
    const handleLogOut = async () => {
        try {
            await Logout();
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/home">Pizza</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            {user && <Nav.Link as={Link} to="/menu">Menu</Nav.Link>}
                            {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                            {!user && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
                            {user && <Nav.Link style={{ color: "red" }} as={Link} onClick={handleLogOut}>LogOut</Nav.Link>}
                            {user && <Nav.Link className="ms-lg-5" as={Link} to="/cart"><CartButton></CartButton></Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet></Outlet>
        </>
    );
}

export default NavigationComp;