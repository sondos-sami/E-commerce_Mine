import { useDispatch, useSelector } from "react-redux";
import { clear, deleteFromCart, incrementQuantity, decrementQuantity } from "../redux/slice";
import { useState } from "react";

export function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');

  let itemCount = 0;
  let totalPrice = cart.reduce((acc, product) => {
    acc += product.old_price * product.quantity;
    itemCount += product.quantity;
    return acc;
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      setCheckoutMessage("Your cart is empty!");
    } else {
      setCheckoutMessage("Thank you for your purchase!");
      // Add any further checkout logic here, like clearing the cart
      dispatch(clear()); // Optional: clear the cart after checkout
    }
  };

  return (
    <section className="h-100 row">
      <div className="col-9">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0">Shopping Cart</h3>
                <h6 className="btn btn-danger" onClick={() => dispatch(clear())}>
                  Clear Cart
                </h6>
              </div>

              {cart.length > 0 ? (
                cart.map((product) => (
                  <div key={product.id} className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img src={product.image} className="img-fluid rounded-3" alt={product.name} />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-4">
                          <p className="lead fw-normal mb-2">{product.name}</p>
                          <p>
                          
                            <span className="text-muted d-block">
                              <strong>Category:</strong> {product.category}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
                          <button className="btn btn-link px-2" onClick={() => product.quantity > 1 && dispatch(decrementQuantity(product))}>
                            <i className="fas fa-minus"></i>
                          </button>
                          <input
                            name="quantity"
                            value={product.quantity}
                            type="number"
                            className="form-control form-control-sm text-center"
                            readOnly
                            style={{ width: '50px', margin: '0 10px' }}
                          />
                          <button className="btn btn-link px-2" onClick={() => dispatch(incrementQuantity(product))}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h5 className="mb-0">${product.old_price.toFixed(2)}</h5>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <button onClick={() => dispatch(deleteFromCart(product))} className="btn btn-danger">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <h5>Your cart is empty.</h5>
                </div>
              )}

              {cart.length > 0 && (
                <h1 className="mt-4">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}): ${totalPrice.toFixed(2)}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 mt-3">
        <div className="card bg-primary text-white rounded-3">
          <div className="card-body">
            {/* Payment Details */}
            <h5 className="mb-4">Card details</h5>
            <p className="small mb-2">Card type</p>
            {/* Card icons here */}
            <form className="mt-4">
              <input type="text" className="form-control form-control-lg mb-4" placeholder="Cardholder's Name" />
              <input type="text" className="form-control form-control-lg mb-4" placeholder="Card Number" />
              <div className="row mb-4">
                <div className="col-md-6">
                  <input type="text" className="form-control form-control-lg" placeholder="MM/YYYY" />
                </div>
                <div className="col-md-6">
                  <input type="password" className="form-control form-control-lg" placeholder="CVV" />
                </div>
              </div>
            </form>
            <hr />

            <button className="btn btn-info btn-block btn-lg" onClick={handleCheckout}>
              <div className="d-flex justify-content-between">
                <span>${totalPrice.toFixed(2)}</span>
                <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
              </div>
            </button>

            {/* Checkout Message */}
            {checkoutMessage && (
              <div className="alert alert-info mt-3">
                {checkoutMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
