import { Container, Card } from "react-bootstrap";
import { useAuth } from "../../store/auth-context";

const HomeContent = () => {
    const { user } = useAuth();
    return (
        <Container>
            <Card className="mt-5 m-auto" style={{ width: "60%" }}>
                <Card.Body>
                    <Card.Title>Welcome to Pizza Restaurant</Card.Title>
                    <Card.Text>
                        We serve the best pizza in town, made with only the freshest ingredients. Whether you're in the mood for a classic Margherita, a spicy pepperoni, or a creative specialty pizza, we have something for everyone.
                    </Card.Text>
                </Card.Body>
            </Card>
            {!user && <h3 className="text-center mt-5">Log in to see the menu and place an order!</h3>}
        </Container>

    );
}

export default HomeContent;