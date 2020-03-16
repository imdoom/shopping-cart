import React from 'react';
import { Modal, Image, Button, Delete, Title, Box, List, Tag, Column } from "rbx";
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
        console.log("newprod", newProducts);
        newProducts.splice(index, 1);
        productState.setCartProducts(newProducts);
    }
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
    };
    var subtitle;
    const afterOpenModal = () => {
        subtitle.style.color = '#f00';
    }
    /* (
    <div>
        <Modal
        isOpen={shopCartState.cartOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => shopCartState.setCartOpen(false)}
        style={customStyles}
        contentLabel="Example Modal">

        <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={() => shopCartState.setCartOpen(false)}>close</button>
        <div>I am a modal</div>
        <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
        </form>
        </Modal>
    </div>) */
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
                                        <Title size={5}>{product.title}</Title>
                                        <Title subtitle size={5}>{product.description}</Title>
                                        <Title className="quantity" size={5}>Quantity: {product.quantity}</Title>
                                    </Column>
                                    <Column size={2}>
                                        <Button onClick= {() => {RemoveProduct(product)}}><i className="material-icons">close</i></Button>
                                        <Title size={5}>${product.price}</Title>
                                    </Column>
                                </Column.Group>                                                
                            </List.Item>
                           )       
                })}
            </List>
            </Modal.Card.Body>
            <Modal.Card.Foot>
            <Title subtitle size={5}>SUBTOTAL {CalTotal()}</Title>
            <Button fullwidth color="black" size="large">Checkout</Button>
            </Modal.Card.Foot>
        </Modal.Card>
        </Modal>)
}

export default ShoppingCart;