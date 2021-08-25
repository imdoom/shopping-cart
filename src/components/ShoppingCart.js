import React from 'react';
import { Modal, Image, Button, Title, Column, List } from "rbx";
import "../css/App.css";

const ShoppingCart = ({shopCartState, productState}) => {
    const CalTotal = () => {
        var total = 0;
        productState.cartProducts.forEach((item) => total = total + item.quantity*item.price);
        return total;
    }
    const RemoveProduct = product => {
        const index = productState.cartProducts.findIndex(i => i.sku === product.sku);
        const newProducts = [...productState.cartProducts, ];
        newProducts.splice(index, 1);
        productState.setCartProducts(newProducts);
    }
    const IncreaseQuantitiy = product => {
        const index = productState.cartProducts.findIndex(i => i.sku === product.sku);
        var newProd = null;
        const Products = [...productState.cartProducts, ];
        if(index>-1){
            newProd = {...Products[index], quantity: Products[index].quantity + 1};
            Products.splice(index, 1, newProd);
        }
        productState.setCartProducts(Products);
    }
    const DecreaseQuantitiy = product => {
        const index = productState.cartProducts.findIndex(i => i.sku === product.sku);
        var newProd = null;
        const Products = [...productState.cartProducts, ];
        if(index>-1 && (Products[index].quantity-1 > 0)){
            newProd = {...Products[index], quantity: Products[index].quantity - 1};
            Products.splice(index, 1, newProd);
            productState.setCartProducts(Products);
        }
        else{
            RemoveProduct(product);
        }

    }
    return(
        <Modal active={shopCartState.cartOpen}>
        <Modal.Background/>
        <Modal.Card>
            <Modal.Card.Head>
            <Modal.Card.Title><Title>Shopping Cart</Title></Modal.Card.Title>
            {/* <Button onClick={() => shopCartState.setCartOpen(!shopCartState.cartOpen)} id="sword-cross" size ="large"><i className="material-icons">cancel</i></Button> */}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40px" 
                height="40px" 
                viewBox="0 0 24 24" 
                onClick={() => shopCartState.setCartOpen(!shopCartState.cartOpen)}
                className="svgIcon"
            >
                <path d="M6.2 2.44l11.9 11.9l2.12-2.12l1.41 1.41l-2.47 2.47l3.18 3.18c.39.39.39 1.02 0 1.41l-.71.71a.996.996 0 0 1-1.41 0L17 18.23l-2.44 2.47l-1.41-1.41l2.12-2.12l-11.9-11.9V2.44H6.2M15.89 10l4.74-4.74V2.44H17.8l-4.74 4.74L15.89 10m-4.95 5l-2.83-2.87l-2.21 2.21l-2.12-2.12l-1.41 1.41l2.47 2.47l-3.18 3.19a.996.996 0 0 0 0 1.41l.71.71c.39.39 1.02.39 1.41 0L7 18.23l2.44 2.47l1.41-1.41l-2.12-2.12L10.94 15z" fill="currentColor"/>
            </svg>
            </Modal.Card.Head>
            <Modal.Card.Body>
            <List>
                {productState.cartProducts.map((product) => {    
                    return(
                            <List.Item key={product.sku}>
                                <Column.Group>
                                    <Column size={3} narrow>
                                        <Image.Container size={'square'}>
                                            <Image src={"./data/products/"+product.sku+"_1"+".jpg"}/>
                                        </Image.Container>
                                    </Column>
                                    <Column size={7}>
                                        <Title></Title>
                                        <Title size={5}>{product.title}</Title>
                                        <Title subtitle size={5}>{product.description}</Title>
                                        <Title className="quantity" size={5}>Quantity: {product.quantity}</Title>
                                    </Column>
                                    <Column size={2}>
                                        <i className="material-icons" onClick= {() => {RemoveProduct(product)}}>close</i>
                                        <Title size={5}>${product.price}</Title>
                                        <i className="material-icons" onClick= {() => {IncreaseQuantitiy(product)}}>add_circle</i>
                                        <i className="material-icons" onClick= {() => {DecreaseQuantitiy(product)}}>remove_circle</i>
                                    </Column>
                                </Column.Group>                                                
                            </List.Item>
                           )       
                })}
            </List>
            </Modal.Card.Body>
            <Modal.Card.Foot>
                    <Column size={6}>
                        <Title size={4}>SUBTOTAL</Title>
                    </Column>
                    <Column size={6}>
                        <Title size={4}>${CalTotal()}</Title>
                    </Column>                     
            </Modal.Card.Foot>
            <Button fullwidth color="black" size="large">Checkout</Button>
        </Modal.Card>
        </Modal>);
};

export default ShoppingCart;