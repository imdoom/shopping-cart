import React, { useState } from 'react';
import { Column, Notification, Image, Button, Title } from "rbx";
import "../css/App.css";

const Product = ({key, product, inventory, setCartOpen, addProduct}) => {
    const [sizeError, setSizeError] = useState();
    const [selectedSize, setSelectedSize] = useState();

    return (
        <Column key={key} size="one-quarter">
            <Notification color="white" textAlign="centered">
                <Image.Container size="128">
                <Image
                    src={`/data/products/${product.sku}_1.jpg`}
                />
                </Image.Container>
                {product.title}
                <Title size={4}>${product.price}</Title>
                <Button.Group 
                align="centered" 
                badge={sizeError}
                badgeColor="danger">
                {Object.keys(inventory).length > 0 ? ( 
                    Object.keys(inventory[product.sku]).filter(s => inventory[product.sku][s] > 0).map(s =>
                    <Button
                    className="sizeBtn"
                    onClick={() => { setSizeError(null); selectedSize === s ? setSelectedSize(null) : setSelectedSize(s);}}
                    color = {selectedSize && selectedSize === s ? "black" : ""}>
                        {s}
                    </Button>)
                    ) :
                    null
                }
                <Button fullwidth color="black" size="large" onClick={() => {
                    if(selectedSize) {
                    setCartOpen(true); 
                    addProduct(product);
                    }
                    else {
                    setSizeError("Select size");
                    }
                }}>
                    Add to cart
                </Button>
                </Button.Group>
            </Notification>
        </Column>
    );
};

export default Product;