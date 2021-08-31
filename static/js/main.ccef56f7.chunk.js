(this["webpackJsonpnew-shopping-cart"]=this["webpackJsonpnew-shopping-cart"]||[]).push([[0],{12:function(e,t,a){},21:function(e,t,a){e.exports=a(47)},26:function(e,t,a){},29:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(10),l=a.n(r),u=(a(26),a(9)),i=a(11),o=a.n(i),s=a(7),m=a(8),d=(a(28),a(12),a(29),a(4)),f=function(e){var t=e.shopCartState,a=e.productState,n=function(e){var t=a.cartProducts.findIndex((function(t){return t.sku===e.sku})),n=Object(s.a)(a.cartProducts);n.splice(t,1),a.setCartProducts(n)};return c.a.createElement(d.f,{active:t.cartOpen},c.a.createElement(d.f.Background,null),c.a.createElement(d.f.Card,null,c.a.createElement(d.f.Card.Head,null,c.a.createElement(d.f.Card.Title,null,c.a.createElement(d.h,null,"Shopping Cart")),c.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40px",height:"40px",viewBox:"0 0 24 24",onClick:function(){return t.setCartOpen(!t.cartOpen)},className:"svgIcon"},c.a.createElement("path",{d:"M6.2 2.44l11.9 11.9l2.12-2.12l1.41 1.41l-2.47 2.47l3.18 3.18c.39.39.39 1.02 0 1.41l-.71.71a.996.996 0 0 1-1.41 0L17 18.23l-2.44 2.47l-1.41-1.41l2.12-2.12l-11.9-11.9V2.44H6.2M15.89 10l4.74-4.74V2.44H17.8l-4.74 4.74L15.89 10m-4.95 5l-2.83-2.87l-2.21 2.21l-2.12-2.12l-1.41 1.41l2.47 2.47l-3.18 3.19a.996.996 0 0 0 0 1.41l.71.71c.39.39 1.02.39 1.41 0L7 18.23l2.44 2.47l1.41-1.41l-2.12-2.12L10.94 15z",fill:"currentColor"}))),c.a.createElement(d.f.Card.Body,null,c.a.createElement(d.d,null,a.cartProducts.map((function(e){return c.a.createElement(d.d.Item,{key:e.sku},c.a.createElement(d.b.Group,null,c.a.createElement(d.b,{size:3,narrow:!0},c.a.createElement(d.c.Container,{size:"square"},c.a.createElement(d.c,{src:"./data/products/"+e.sku+"_1.jpg"}))),c.a.createElement(d.b,{size:7},c.a.createElement(d.h,null),c.a.createElement(d.h,{size:5},e.title),c.a.createElement(d.h,{subtitle:!0,size:5},e.description),c.a.createElement(d.h,{className:"quantity",size:5},"Quantity: ",e.quantity)),c.a.createElement(d.b,{size:2},c.a.createElement("i",{className:"material-icons",onClick:function(){n(e)}},"close"),c.a.createElement(d.h,{size:5},"$",e.price),c.a.createElement("i",{className:"material-icons",onClick:function(){!function(e){var t=a.cartProducts.findIndex((function(t){return t.sku===e.sku})),n=null,c=Object(s.a)(a.cartProducts);t>-1&&(n=Object(u.a)({},c[t],{quantity:c[t].quantity+1}),c.splice(t,1,n)),a.setCartProducts(c)}(e)}},"add_circle"),c.a.createElement("i",{className:"material-icons",onClick:function(){!function(e){var t=a.cartProducts.findIndex((function(t){return t.sku===e.sku})),c=null,r=Object(s.a)(a.cartProducts);t>-1&&r[t].quantity-1>0?(c=Object(u.a)({},r[t],{quantity:r[t].quantity-1}),r.splice(t,1,c),a.setCartProducts(r)):n(e)}(e)}},"remove_circle"))))})))),c.a.createElement(d.f.Card.Foot,null,c.a.createElement(d.b,{size:6},c.a.createElement(d.h,{size:4},"SUBTOTAL")),c.a.createElement(d.b,{size:6},c.a.createElement(d.h,{size:4},"$",function(){var e=0;return a.cartProducts.forEach((function(t){return e+=t.quantity*t.price})),e}()))),c.a.createElement(d.a,{fullwidth:!0,color:"black",size:"large"},"Checkout")))},p=function(e){var t=e.key,a=e.product,r=e.inventory,l=e.setCartOpen,u=e.addProduct,i=Object(n.useState)(),o=Object(m.a)(i,2),s=o[0],f=o[1],p=Object(n.useState)(),E=Object(m.a)(p,2),b=E[0],h=E[1];return c.a.createElement(d.b,{key:t,size:"one-quarter"},c.a.createElement(d.g,{color:"white",textAlign:"centered"},c.a.createElement(d.c.Container,{size:"128"},c.a.createElement(d.c,{src:"/data/products/".concat(a.sku,"_1.jpg")})),a.title,c.a.createElement(d.h,{size:4},"$",a.price),c.a.createElement(d.a.Group,{align:"centered",badge:s,badgeColor:"danger"},Object.keys(r).length>0?Object.keys(r[a.sku]).filter((function(e){return r[a.sku][e]>0})).map((function(e){return c.a.createElement(d.a,{className:"sizeBtn",onClick:function(){f(null),h(b===e?null:e)},color:b&&b===e?"black":""},e)})):null,c.a.createElement(d.a,{fullwidth:!0,color:"black",size:"large",onClick:function(){b?(l(!0),u(a)):f("Select size")}},"Add to cart"))))},E=a(5),b=a.n(E),h=(a(35),a(18),{signInFlow:"popup",signInOptions:[b.a.auth.GoogleAuthProvider.PROVIDER_ID],callbacks:{signInSuccessWithAuthResult:function(){return!1}}});b.a.initializeApp({apiKey:"AIzaSyCK8vbymPcLDewFfHznSt8lEdgGZp4O4rk",authDomain:"shopping-cart-2069e.firebaseapp.com",databaseURL:"https://shopping-cart-2069e.firebaseio.com",projectId:"shopping-cart-2069e",storageBucket:"shopping-cart-2069e.appspot.com",messagingSenderId:"17139108491",appId:"1:17139108491:web:b7a7a301853ae0e95f228e",measurementId:"G-NF59H641RN"});var g=b.a.database().ref(),k=a(19),O=a.n(k),C=function(){var e=Object(n.useState)({}),t=Object(m.a)(e,2),a=t[0],r=t[1],l=Object(n.useState)(!1),i=Object(m.a)(l,2),E=i[0],k=i[1],C=Object(n.useState)([]),v=Object(m.a)(C,2),j=v[0],w=v[1],z=Object(n.useState)({}),y=Object(m.a)(z,2),S=y[0],x=y[1],A=Object(n.useState)([]),L=Object(m.a)(A,2),I=L[0],P=L[1],N=Object(n.useState)(),q=Object(m.a)(N,2),B=q[0],H=q[1],G=Object(n.useState)(!1),M=Object(m.a)(G,2),F=(M[0],M[1]),R=Object.values(a),V=function(){var e=[],t=Object.keys(S);return I.length>0?I.forEach((function(a){t.forEach((function(t){S[t][a]>0&&!e.find((function(e){return e.sku==t}))&&e.push(R.find((function(e){return e.sku==t})))}))})):e=Object(s.a)(R),e}();Object(n.useEffect)((function(){!function(){var e,t;o.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.awrap(fetch("./data/products.json"));case 2:return e=a.sent,a.next=5,o.a.awrap(e.json());case 5:t=a.sent,r(t);case 7:case"end":return a.stop()}}))}()}),[]),Object(n.useEffect)((function(){b.a.auth().onAuthStateChanged(H)}),[]),Object(n.useEffect)((function(){F(!0);var e=function(e){e.val()&&x(e.val())};return g.on("value",e,(function(e){return alert(e)})),function(){g.off("value",e)}}),[]);var _=function(e){var t,a=Object(s.a)(j),n=a.findIndex((function(t){return t.sku===e.sku}));n>-1?(t=Object(u.a)({},a[n],{quantity:a[n].quantity+1}),a.splice(n,1,t)):(t=Object(u.a)({},e,{quantity:1}),a.push(t)),w(a)},D=function(e){var t=Object(s.a)(I),a=t.indexOf(e);a>-1?t.splice(a,1):t.push(e),P(t)},W=function(e){var t=e.user;return c.a.createElement(d.e,{color:"info"},c.a.createElement(d.e.Header,null,"Welcome, ",t.displayName,c.a.createElement(d.a,{primary:!0,onClick:function(){return b.a.auth().signOut()}},"Log out")))},$=function(){return c.a.createElement(O.a,{uiConfig:h,firebaseAuth:b.a.auth()})};return c.a.createElement("div",{id:"app"},c.a.createElement(d.b.Group,null,c.a.createElement(d.b,{textAlign:"centered",size:2},c.a.createElement(d.h,null,"Filter Sizes")),c.a.createElement(d.b,{size:2},c.a.createElement(d.a.Group,{textAlign:"left",narrow:!0},c.a.createElement(d.a,{rounded:!0,onClick:function(){return D("S")},color:I.includes("S")?"black":"",className:"sizeBtn"},"S"),c.a.createElement(d.a,{rounded:!0,onClick:function(){return D("M")},color:I.includes("M")?"black":"",className:"sizeBtn"},"M"),c.a.createElement(d.a,{rounded:!0,onClick:function(){return D("L")},color:I.includes("L")?"black":"",className:"sizeBtn"},"L"),c.a.createElement(d.a,{rounded:!0,onClick:function(){return D("XL")},color:I.includes("XL")?"black":"",className:"sizeBtn"},"XL"))),c.a.createElement(d.b,{paddingless:!0,marginless:!0},c.a.createElement((function(e){var t=e.user;return c.a.createElement(c.a.Fragment,null,t?c.a.createElement(W,{user:t}):c.a.createElement($,null))}),{user:B})),c.a.createElement(d.b,{textAlign:"right",size:2},c.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"45px",height:"45px",viewBox:"0 0 24 24",onClick:function(){k(!E)},className:"svgIcon"},c.a.createElement("path",{fill:"currentColor",d:"M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"})))),c.a.createElement(f,{shopCartState:{cartOpen:E,setCartOpen:k},productState:{cartProducts:j,setCartProducts:w}},"Cart"),c.a.createElement(d.b.Group,{multiline:!0,centered:!0,gapSize:5,className:"cards"},V.map((function(e){return c.a.createElement(p,{key:e.sku,product:e,inventory:S,setCartOpen:k,addProduct:_})}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[21,1,2]]]);
//# sourceMappingURL=main.ccef56f7.chunk.js.map