import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import "./css/App.css";
import "./css/ShoppingCart.css";
import { Column, Notification, Image, Tag, Button } from "rbx";
import ShoppingCart from "./components/ShoppingCart"

const App = () => {
  const [data, setData] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const products = Object.values(data);
  //console.log("Initial products", products);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);
  const AddProduct = (product) => {
    var products = cartProducts;
    var newProd = null;
    const index = products.findIndex(i => i.sku === product.sku);
    console.log("index", index);
    if(index>-1){
      newProd = {...products[index], quantity: products[index].quantity + 1};
      products.splice(index, 1, newProd);
    }
    else{
      newProd = {...product, quantity: 1};
      products.push(newProd);
    }
    console.log("After adding new prod", products);
    setCartProducts(products);
  }

  return (
    <React.Fragment>
      <ShoppingCart shopCartState={{cartOpen, setCartOpen}} productState={{cartProducts, setCartProducts}}>Cart</ShoppingCart>
      <Button onClick={() => { cartOpen? setCartOpen(false) : setCartOpen(true)}} id="shop-cart" size ="medium"><i className="material-icons">shopping_cart</i></Button>
      <Column.Group multiline centered gapSize={5} className="cards">
        {products.map(product => <Column key={product.sku} size="one-quarter">
                                    <Notification color="white" textAlign="centered">
                                      <Image.Container size="128">
                                        <Image
                                          src={"./data/products/"+product.sku+"_1"+".jpg"}
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
                                      <Button fullwidth color="black" size="large" onClick={()=>{setCartOpen(true); AddProduct(product)}}>Add to cart</Button>
                                    </Notification>
                                  </Column>)}
      </Column.Group>
    </React.Fragment>
  );
};

export default App;