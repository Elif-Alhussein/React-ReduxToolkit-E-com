import '../Cart/Cart.css';
import { useState } from 'react';
import { FaShoppingBasket, FaTrash, FaRedoAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, resetCart } from '../../redux/cartReducer';

export default function Cart() {
    const [cartList, setCartList] = useState(false);
    const showCartList = () => {cartList ? setCartList(false) : setCartList(true)}

    const products = useSelector(state=>state.cart.products)
    const dispatch = useDispatch()


    return (
        <div className='cart'>
            <div className="cart-icon" 
            onClick={products.length > 0 && showCartList}>
                
                <FaShoppingBasket />
            </div>
            <div className="cart-badge">{products.length}</div>

            {cartList || products.length > 0
                ?(
                    <ul className="cart-list">
                        {products.map(product => (
                            <li key={product.id} className="cart-item">
                                <img src={import.meta.env.VITE_APP_URL + product.image } className="cart-item-image" />
                                <span className="cart-item-title">{product.title}</span>
                                <span className="cart-item-price">${product.price}</span>
                                <span className="cart-item-remove"
                                  onClick={()=> dispatch(removeFromCart({
                                        id: product.id,
                                   }))}  
                                ><FaTrash /></span>
                            </li>
                        ))}
                        <span className="cart-reset"
                            onClick={()=> dispatch(resetCart())} 
                        ><FaRedoAlt /></span>
                    </ul>
                )
                :("")
            }
        </div>
    )
}