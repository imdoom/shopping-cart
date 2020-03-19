import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import "./css/App.css";
import "./css/ShoppingCart.css";
import { Column, Notification, Image, Button, Title, Message } from "rbx";
import ShoppingCart from "./components/ShoppingCart"
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyCK8vbymPcLDewFfHznSt8lEdgGZp4O4rk",
  authDomain: "shopping-cart-2069e.firebaseapp.com",
  databaseURL: "https://shopping-cart-2069e.firebaseio.com",
  projectId: "shopping-cart-2069e",
  storageBucket: "shopping-cart-2069e.appspot.com",
  messagingSenderId: "17139108491",
  appId: "1:17139108491:web:b7a7a301853ae0e95f228e",
  measurementId: "G-NF59H641RN"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const App = () => {
  const [data, setData] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [inventory, setInventory] = useState({});
  const [sizes, setSizes] = useState([]);
  const [user, setUser] = useState(null);
  const products = Object.values(data);
  const sizeFilter = () =>{
    var arr = [];
    var keys = Object.keys(inventory);
    console.log("keys "+keys);
    sizes.length > 0 ? sizes.forEach(s => {keys.forEach(key => {if(inventory[key][s] > 0 && !arr.find(i => i.sku == key)) arr.push(products.find(p => p.sku == key))})}) : arr = [...products, ];
    return arr;
  }
  const shownProducts = sizeFilter();
  //console.log("shown prod "+shownProducts);

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
  /* useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('./data/inventory.json');
      const json = await response.json();
      setInventory(json);
    };
    fetchInventory();
  }, []); */
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setInventory(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
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
    <React.Fragment>      
      <ShoppingCart shopCartState={{cartOpen, setCartOpen}} productState={{cartProducts, setCartProducts}}>Cart</ShoppingCart>
      <Button onClick={() => { cartOpen? setCartOpen(false) : setCartOpen(true)}} id="shop-cart" size ="medium"><i className="material-icons">shopping_cart</i></Button>
      <Banner user={ user } className="banner"/>
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
                                      <Title size={4}>${product.price}</Title>
                                      <Button.Group align="centered">                                                                                   
                                          {Object.keys(inventory).length > 0 ? Object.keys(inventory[product.sku]).map(s => (inventory[product.sku][s] > 0) && <Button>{s}</Button>) : null}                                        
                                      </Button.Group>
                                      <Button fullwidth color="black" size="large" onClick={()=>{setCartOpen(true); AddProduct(product)}}>Add to cart</Button>
                                    </Notification>
                                  </Column>)}
      </Column.Group>
    </React.Fragment>
  );
};

export default App;