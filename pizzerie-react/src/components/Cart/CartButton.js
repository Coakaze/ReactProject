import { Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

const CartButton = () => {
    const globalState = useContext(CartContext);
    const noItems = globalState.items.reduce((curr, item) => {
        return curr + item.amount;
    }, 0);
    return (
        <Button variant="warning">
            <span>Your Cart </span>
            <Badge className="ms-2" bg="danger">{noItems}</Badge>
        </Button>
    );
}

export default CartButton;