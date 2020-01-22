import React, { useEffect, useState } from 'react';
import "rbx/index.css";
import "./App.css";
import { Column, Notification, Image, Tag, Button } from "rbx";




const App = () => {
  const [data, setData] = useState({});
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
  );
};

export default App;