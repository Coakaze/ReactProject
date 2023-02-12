import { Card } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../store/cart-context";
import CartItem from "./CartItem";
import CartModal from "./CartModal";

const CartContent = (props) => {
    const globalState = useContext(CartContext);
    const cartList = globalState.items.map(meal => <CartItem key={meal.id} mealDesc={meal}></CartItem>);

    return (
        <>
            {<Card style={{ width: "50%", margin: "auto" }}>
                {cartList}
                {!props.emptyCart && <h3 style={{ marginLeft: "auto", marginRight: "20px" }}>Total: {globalState.amount}$</h3>}
            </Card>}
            {!props.emptyCart && <CartModal></CartModal>}
        </>
    );
}

export default CartContent;