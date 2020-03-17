import React from 'react';
import { Modal, Image, Button, Delete, Title, Column, List } from "rbx";
import ReactDOM from 'react-dom';
//import Modal from 'react-modal';

const ShoppingCart = ({shopCartState, productState}) => {
    const CalTotal = () => {
        var total = 0;
        productState.cartProducts.forEach((item) => total = total + item.quantity*item.price);
        return total;
        //reduce((a,b) => {console.log("a,b price", a.price, b.price); return(a.price*a.quantity + b.price*b.quantity)}, {"price": 0, quantity: 0});
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
            <Delete onClick={() => shopCartState.setCartOpen(false)}/>
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
        </Modal>)
}

export default ShoppingCart;