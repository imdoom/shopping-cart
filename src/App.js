import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import "./css/App.css";
import "./css/ShoppingCart.css";
import { Column, Notification, Image, Tag, Button, Title } from "rbx";
import ShoppingCart from "./components/ShoppingCart"

const App = () => {
  const [data, setData] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [inventory, setInventory] = useState({});
  const [sizes, setSizes] = useState([]);
  const products = Object.values(data);
  const sizeFilter = () =>{
    var arr = [];
    var keys = Object.keys(inventory);
    console.log("keys "+keys);
    sizes.length > 0 ? sizes.forEach(s => {keys.forEach(key => {if(inventory[key][s] > 0 && !arr.find(i => i.sku == key)) arr.push(products.find(p => p.sku == key))})}) : arr = [...products, ];
    return arr;
  }
  const shownProducts = sizeFilter();
  console.log("shown prod "+shownProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('./data/inventory.json');
      const json = await response.json();
      setInventory(json);
    };
    fetchInventory();
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
  const sizeSelection = size => {
    var arr = [...sizes, ];
    const index = arr.findIndex(s => s === size);
    if(arr.includes(size)){
      arr.splice(index, 1);
    }
    else{
      arr.push(size);
    }
    setSizes(arr);
  }

  return (
    <React.Fragment>
      <ShoppingCart shopCartState={{cartOpen, setCartOpen}} productState={{cartProducts, setCartProducts}}>Cart</ShoppingCart>
      <Button onClick={() => { cartOpen? setCartOpen(false) : setCartOpen(true)}} id="shop-cart" size ="medium"><i className="material-icons">shopping_cart</i></Button>
      <Button.Group>
        <Column size={1}>
            <Title size={4}>
              Sizes
            </Title>
        </Column>
        <Column>
          <Button onClick={() => sizeSelection('S')} color={sizes.includes('S') ? "black" : "light"}>S</Button>
          <Button onClick={() => sizeSelection('M')} color={sizes.includes('M') ? "black" : "light"}>M</Button>
          <Button onClick={() => sizeSelection('L')} color={sizes.includes('L') ? "black" : "light"}>L</Button>
          <Button onClick={() => sizeSelection('XL')} color={sizes.includes('XL') ? "black" : "light"}>XL</Button>
        </Column>
      </Button.Group>
      <Column.Group multiline centered gapSize={5} className="cards">
        {shownProducts.map(product => <Column key={product.sku} size="one-quarter">
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