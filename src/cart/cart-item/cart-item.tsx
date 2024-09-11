import React from "react";
import Button from '@material-ui/core/Button';
//types
import {CartItemType} from "../../App";
//styles
import {Wrapper} from "./cart-item.styles";

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => {

    return (
        <Wrapper>
            <div>
                <h3>{item.title}</h3>
                <div className="information">
                    <p>Price: ${item.price}</p>
                    <p> Total: ${(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className="buttons">
                    <Button size="small" variant='contained' disableElevation onClick={() => removeFromCart(item.id)}>-</Button>
                    <p>{item.amount}</p>
                    <Button size="small" variant='contained' disableElevation onClick={() => addToCart(item)}>+</Button>
                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </Wrapper>
    );
}

export default CartItem;
