import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import CartContent from "../components/Cart/CartContent";

const CartPage = () => {
    const globalState = useContext(CartContext);
    const emptyCart = globalState.items.length === 0;
    return (
        <>
            {!emptyCart && <h1 className="text-center mt-5 mb-4">This is your cart</h1>}
            {emptyCart && <h1 className="text-center mt-5 mb-4">Your cart is empty</h1>}
            <CartContent emptyCart={emptyCart}></CartContent>
        </>
    );
}

export default CartPage;