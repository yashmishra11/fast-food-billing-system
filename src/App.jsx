import { useState } from "react";
import "./App.css"; // Separate CSS file

const menuItems = [
  { id: 1, name: "Burger", price: 45 },
  { id: 2, name: "Chaat", price: 20 },
  { id: 3, name: "Fries", price: 30 },
  { id: 4, name: "Soda", price: 25 },
  { id: 5, name: "Samosa", price: 25 },
  { id: 6, name: "Vada Pav", price: 20 },
  { id: 7, name: "Chinese Pakoda", price: 20 },
];

const bagItem = { id: 999, name: "Carry Bag", price: 10 };

function FastFoodBilling() {
  const [cart, setCart] = useState([]);
  const [bagAdded, setBagAdded] = useState(false);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      if (id === bagItem.id) {
        setBagAdded(false);
      }

      return updatedCart;
    });
  };

  const addBag = () => {
    if (!bagAdded) {
      setCart((prevCart) => [...prevCart, { ...bagItem, quantity: 1 }]);
      setBagAdded(true);
    }
  };

  const clearCart = () => {
    setCart([]);
    setBagAdded(false);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1 className="title">QuickByte Café</h1>
      <div className="menu">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => addToCart(item)} className="menu-button">
            {item.name} - ₹ {item.price}
          </button>
        ))}
      </div>
      <h2 className="cart-title">Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <span>
                {item.name} x {item.quantity} - ₹ {item.price * item.quantity}
              </span>
              <button onClick={() => removeFromCart(item.id)} className="remove-button">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h2 className="total">Total: ₹ {totalPrice}</h2>
      <div className="button-group">
        <button className="checkout-button">Checkout</button>
        <button onClick={clearCart} className="clear-button">Clear All</button>
        <button onClick={addBag} className="bag-button" disabled={bagAdded}>
          {bagAdded ? "Bag Added" : "Add Bag ₹10"}
        </button>
      </div>
    </div>
  );
}

export default FastFoodBilling;