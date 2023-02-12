import { Card, Row, Col, Button } from "react-bootstrap";
import { CartContext } from "../../store/cart-context";
import { useContext } from "react";

const CartItem = (props) => {
    const globalState = useContext(CartContext);

    const handleDeleteButton = () => {
        globalState.deleteItem(props.mealDesc.id);
    }

    return (
        <Card style={{ width: "70%", margin: "auto" }} className="my-4">
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{props.mealDesc.title} - {props.mealDesc.price}$</Card.Title>
                        <Card.Text>Amount: {props.mealDesc.amount}</Card.Text>
                    </Col>
                    <Col>
                        <Button onClick={handleDeleteButton} className="float-end" type="submit" variant="danger">Delete</Button>
                    </Col>
                </Row>

            </Card.Body>
        </Card >
    );
}

export default CartItem;