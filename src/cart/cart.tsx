import React from "react";
//components
import CartItem from "./cart-item/cart-item";
//styles
import {Wrapper} from "./cart.styles";
//types
import {CartItemType} from "../App";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {

    const calculateTotal = (items: CartItemType[]) => {
        let total = 0;
        items.reduce((ack: number, item) => total = ack + item.amount * item.price, 0)
        return total;
    }


    return (
        <Wrapper>
            <h2>Ваша корзина для покупок</h2>
            {cartItems.length === 0 ? <p>Ваша корзина пуста</p> : null}
            {cartItems.map(item =>
                (<CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />))}

            <h2>Итого: {calculateTotal(cartItems).toFixed(2)} $</h2>
        </Wrapper>
    );
};

export default Cart;
