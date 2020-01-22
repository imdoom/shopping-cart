import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import "./App.css";
import { Column, Notification, Image, Tag, Button } from "rbx";
import ShoppingCart from "./components/ShoppingCart"

const App = () => {
  const [data, setData] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setcartProducts] = useState({
    "12064273040195392": {
      "sku": 12064273040195392,
      "title": "Cat Tee Black T-Shirt",
      "description": "4 MSL",
      "style": "Black with custom print",
      "price": 10.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    }
  });
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <ShoppingCart shopCartState={{cartOpen, setCartOpen}} productState={{cartProducts, setcartProducts}}>Cart</ShoppingCart>
      <Button onClick={() => { cartOpen? setCartOpen(false) : setCartOpen(true)}} id="shop-cart" size ="medium"><i class="material-icons">shopping_cart</i></Button>
      <Column.Group multiline centered gapSize={5} className="cards">
        {products.map(product => <Column key={product.sku} size="one-quarter">
                                    <Notification color="white" textAlign="centered">
                                      <Image.Container size="128">
                                        <Image
                                          src={"data/products/"+product.sku+"_1"+".jpg"}
                                        />
                                      </Image.Container>
                                      {product.title}
                                      <br></br>
                                      <Tag size="large">${product.price}</Tag>
                                      <br></br>
                                      <Button.Group align="centered"> 
                                        <Button color="danger">S</Button>
                                        <Button color="danger">M</Button>
                                        <Button color="danger">L</Button>
                                        <Button color="danger">XL</Button>
                                      </Button.Group>
                                      <br></br>
                                      <Button fullwidth color="black" size="large">Add to cart</Button>
                                    </Notification>
                                  </Column>)}
      </Column.Group>
    </React.Fragment>
  );
};

export default App;