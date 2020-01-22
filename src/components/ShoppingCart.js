import React from 'react';
import { Modal, Content, Button, Delete, Title, Box, List } from "rbx";

const ShoppingCart = ({shopCartState, productState}) => {
    return(
        <Modal active={shopCartState.cartOpen}>
        <Modal.Background onClick={() => shopCartState.setCartOpen(false)}/>
        <Modal.Card>
            <Modal.Card.Head>
            <Modal.Card.Title><Title>Shopping Cart</Title></Modal.Card.Title>
            <Delete onClick={() => shopCartState.setCartOpen(false)}/>
            </Modal.Card.Head>
            <Modal.Card.Body>
            <List>
                {Object.values(productState.cartProducts).map((product) => {    
                    return(<Box>
                            <List.Item key={product}>
                                {product.title}
                                <br></br>
                                {product.description}                   
                            </List.Item>
                            </Box>)       
                })}
            </List>
            </Modal.Card.Body>
            <Modal.Card.Foot>
            <Button color="success">Save changes</Button>
            <Button>Cancel</Button>
            </Modal.Card.Foot>
        </Modal.Card>
        </Modal>)
}

export default ShoppingCart;