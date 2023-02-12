import { RouterProvider } from 'react-router-dom';
import { CartProvider } from '../store/cart-context';
import { useAuth } from '../store/auth-context';

const CartWrapper = (props) => {
    let { user } = useAuth();
    return (
        <>
            {user && <CartProvider>
                <RouterProvider router={props.route}></RouterProvider>
            </CartProvider>}
            {!user && <RouterProvider router={props.route}></RouterProvider>}
        </>

    );
}

export default CartWrapper;