import React, {useState} from 'react';
import {useQuery} from "react-query";
// COMPONENTS
import Item from "./item/item";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from "@material-ui/core/Badge";
import Cart from "./cart/cart";
// STYLES
import {Wrapper, StyledButton} from "./App.styles";
//types

export type CartItemType = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    amount: number
}

const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')
        .then(res => res.json()));


const App: React.FC = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);

    const {data, isLoading, isError} = useQuery<CartItemType[]>(
        'products',
        getProducts
    );

    const getTotalItems = (items: CartItemType[]) => {
        return items.reduce((acc, item) => acc + item.amount, 0);
    };

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            const isItemInCart = prev.find(item => item.id === clickedItem.id);
            if (isItemInCart) {
                return prev.map(item => {
                    if (item.id === clickedItem.id) {
                        return {...item, amount: item.amount + 1};
                    }
                    return item;
                });
            }
            return [...prev, {...clickedItem, amount: 1}];
        })

    };

    const handleRemoveFromCart = (id: number) => {

        setCartItems((prev) => (
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, {...item, amount: item.amount - 1}];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        ))
    };

    if (isLoading) return <LinearProgress/>;
    if (isError) return <p>Error</p>;


    return (
        <Wrapper>

            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}/>
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCartIcon/>
                </Badge>
            </StyledButton>

            <Grid container spacing={3}>
                {
                    data?.map((item: CartItemType) => (
                        <Grid item key={item.id} xs={12} sm={4}>
                            <Item item={item} handleAddToCart={handleAddToCart}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Wrapper>
    );
}

export default App;
