import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import "./css/App.css";
import "./css/ShoppingCart.css";
import { Column, Button, Title, Message } from "rbx";
import ShoppingCart from "./components/ShoppingCart";
import Product from "./components/Product";
import {db, uiConfig, firebase} from './components/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const App = () => {
  const [data, setData] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [inventory, setInventory] = useState({});
  const [sizes, setSizes] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const products = Object.values(data);
  const sizeFilter = () => {
    var arr = [];
    var keys = Object.keys(inventory);
    sizes.length > 0 ? sizes.forEach(s => {keys.forEach(key => {if(inventory[key][s] > 0 && !arr.find(i => i.sku == key)) arr.push(products.find(p => p.sku == key))})}) : arr = [...products, ];
    return arr;
  }
  const shownProducts = sizeFilter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);
 
  useEffect(() => {
    setLoading(true);
    const handleData = snap => {
      if (snap.val()) setInventory(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  const addProduct = (product) => {
    let products = [...cartProducts];
    let newProd;
    const index = products.findIndex(i => i.sku === product.sku);
    //console.log("index", index);
    if(index>-1){
      newProd = {...products[index], quantity: products[index].quantity + 1};
      products.splice(index, 1, newProd);
    }
    else{
      newProd = {...product, quantity: 1};
      products.push(newProd);
    }
    //console.log("After adding new prod", products);
    setCartProducts(products);
  }
  const sizeSelection = size => {
    var arr = [...sizes];
    const index = arr.indexOf(size);
    if(index > -1){
      arr.splice(index, 1);
    }
    else{
      arr.push(size);
    }
    setSizes(arr);
  }
  const Banner = ({ user }) => (
    <React.Fragment>
      { user ? <Welcome user={ user } /> : <SignIn /> }
    </React.Fragment>
  );
  const Welcome = ({ user }) => (
    <Message color="info">
      <Message.Header>
        Welcome, {user.displayName}
        <Button primary onClick={() => firebase.auth().signOut()}>
          Log out
        </Button>
      </Message.Header>
    </Message>
  );
  const SignIn = () => (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
  );

  return (
    <div id="app">
      <Column.Group>
        <Column textAlign="centered" size={2}>
          <Title >Filter Sizes</Title>
        </Column>
        <Column size={2}>
          <Button.Group textAlign="left" narrow>
            <Button rounded onClick={() => sizeSelection('S')} color={sizes.includes('S') ? "black" : "" } className = "sizeBtn">S</Button>
            <Button rounded onClick={() => sizeSelection('M')} color={sizes.includes('M') ? "black" : ""} className = "sizeBtn">M</Button>
            <Button rounded onClick={() => sizeSelection('L')} color={sizes.includes('L') ? "black" : ""} className = "sizeBtn">L</Button>
            <Button rounded onClick={() => sizeSelection('XL')} color={sizes.includes('XL') ? "black" : ""} className = "sizeBtn">XL</Button>
          </Button.Group>
        </Column>
        <Column paddingless marginless>
          <Banner user={ user }/>
        </Column>
        <Column textAlign="right" size={2}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45px"
            height="45px" 
            viewBox="0 0 24 24" 
            onClick={() => { setCartOpen(!cartOpen)}}
            className="svgIcon"
          >
            <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
          </svg>
          {/* <Button  id="shop-cart" size ="large"><i className="material-icons">shopping_cart</i></Button> */}
        </Column>        
      </Column.Group>     
      <ShoppingCart shopCartState={{cartOpen, setCartOpen}} productState={{cartProducts, setCartProducts}}>Cart</ShoppingCart>
      
      <Column.Group multiline centered gapSize={5} className="cards">
        {shownProducts.map(product => ( 
          <Product
            key={product.sku}
            product={product} 
            inventory={inventory} 
            setCartOpen={setCartOpen} 
            addProduct={addProduct}
          />
        ))}
      </Column.Group>
    </div>
  );
};

export default App;