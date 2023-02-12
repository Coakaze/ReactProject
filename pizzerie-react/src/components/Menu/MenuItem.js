import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useRef } from "react";
import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

const MenuItem = (props) => {
    const globalState = useContext(CartContext);
    const inputRef = useRef();

    const addToCart = (amount) => {
        const item = {
            id: props.mealDesc.id,
            title: props.mealDesc.title,
            amount: amount,
            price: props.mealDesc.price
        }
        globalState.addItem(item);
    }

    const handleForm = event => {
        event.preventDefault();
        const enteredInput = +(inputRef.current.value);
        addToCart(enteredInput);
    }

    return (
        <Col>
            <Card className="mt-5">
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{props.mealDesc.title} - {props.mealDesc.price}$</Card.Title>
                            <Card.Text>{props.mealDesc.text}</Card.Text>
                        </Col>
                        <Col>
                            <Form onSubmit={handleForm}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4" htmlFor="amount">Amount</Form.Label>
                                    <Form.Control ref={inputRef} className="w-25" size="sm" type="number" id="amount" min="1" step="1" defaultValue="1" ></Form.Control>
                                </Form.Group>
                                <Button type="submit" className="mt-4" variant="danger">Add to cart</Button>
                            </Form>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </Col>
    );
};

export default MenuItem;