import { createContext } from "react";
import { useReducer } from "react";
import { useAuth } from "./auth-context";

const cartState = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        let itemExist = false;
        for (let element of state.items) {
            if (element.id === action.menuItem.id) {
                element.amount += action.menuItem.amount;
                state.amount += action.menuItem.price * action.menuItem.amount;
                itemExist = true;
                break;
            }
        }
        if (!itemExist) {
            state.items = state.items.concat(action.menuItem);
            state.amount += action.menuItem.price * action.menuItem.amount;
        }
        localStorage.setItem(action.loggedUser, JSON.stringify({
            items: state.items,
            amount: state.amount
        }));
        return {
            items: state.items,
            amount: state.amount
        }
    }
    if (action.type === 'DELETE_ITEM') {
        const itemToDelete = state.items.findIndex((obj) => obj.id === action.itemId);
        state.amount -= state.items[itemToDelete].price * state.items[itemToDelete].amount;
        state.items.splice(itemToDelete, 1);
        localStorage.setItem(action.loggedUser, JSON.stringify({
            items: state.items,
            amount: state.amount
        }))
        return {
            items: state.items,
            amount: state.amount
        }
    }
    if (action.type === 'DELETE_CART') {
        localStorage.removeItem(action.loggedUser);
        return {
            items: [],
            amount: 0
        }
    }
    //return emptyCartState;
}

export const CartContext = createContext();

export const CartProvider = props => {
    const emptyCartState = {
        items: [],
        amount: 0
    };
    let { user } = useAuth();
    let userEmail = user.email;
    console.log(userEmail);
    const defaultCartState = JSON.parse(localStorage.getItem(userEmail)) ? JSON.parse(localStorage.getItem(userEmail)) : emptyCartState;
    const [cart, dispatch] = useReducer(cartState, defaultCartState);
    const addItemToCart = (item) => {
        dispatch({ type: 'ADD_ITEM', menuItem: item, loggedUser: userEmail });
    };

    const deleteItemFromCart = (id) => {
        dispatch({ type: 'DELETE_ITEM', itemId: id, loggedUser: userEmail });
    };

    const deleteEntireCart = () => {
        dispatch({ type: 'DELETE_CART', loggedUser: userEmail });
    }

    const cartContext = {
        items: cart.items,
        amount: cart.amount,
        addItem: addItemToCart,
        deleteItem: deleteItemFromCart,
        deleteCart: deleteEntireCart
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}
