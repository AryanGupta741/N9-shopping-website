import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishList } from "../Features/Wishlist/wishListSlice";
import { addToCart } from "../Features/Cart/cartSlice";
import { MdOutlineClose } from "react-icons/md";
import toast from "react-hot-toast";
import "./Wishlist.css";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddToCart = (product) => {
    const productInCart = cartItems.find(
      (item) => item.productID === product.productID
    );

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached", {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
      });
    } else {
      dispatch(addToCart(product));
      toast.success(`Added to cart!`, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>
      <div className="wishlist-container">
        {wishlistItems.length > 0 ? (
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item) => (
                <tr key={item.productID}>
                  <td>
                    <div className="wishlist-product">
                      <Link to={`/product/${item.productID}`} onClick={scrollToTop}>
                        <img src={item.frontImg} alt={item.productName} />
                      </Link>
                      <div className="wishlist-product-info">
                        <Link to={`/product/${item.productID}`} onClick={scrollToTop}>
                          <h4>{item.productName}</h4>
                        </Link>
                        <p>{item.productReviews}</p>
                      </div>
                    </div>
                  </td>
                  <td>${item.productPrice}</td>
                  <td>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </td>
                  <td>
                    <MdOutlineClose
                      className="remove-icon"
                      onClick={() => dispatch(removeFromWishList(item))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="wishlist-empty">
            <p>Your wishlist is empty!</p>
            <Link to="/shop" onClick={scrollToTop}>
              <button>Go Shopping</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
