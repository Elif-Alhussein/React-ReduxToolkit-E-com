import '../Products/Products.css';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import StoreContext from '../../hooks/storeContext';
import { addToCart } from '../../redux/cartReducer';
import { useDispatch } from 'react-redux';

const Products = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const dispatch = useDispatch()

  const {filter} = useContext(StoreContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(filter);
        setProducts(response.data.data); 
        setError(null); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filter]);

  useEffect(()=>{
    console.log(filter)
  },[filter])

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error fetching products: {error.message}</p>
      ) : (
        <div className='products'>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div className='product' key={product.id}>
                <h2 className='product-title' >{product.Title}</h2>
                <div className='product-price'>Price: ${product.price}</div>
                {product.image && (
                  <img
                    className='product-image' 
                    src={`${import.meta.env.VITE_APP_URL}${product.image.url}`}
                    alt={product.image.name}
                  />
                )}
                <div className='product-desc'>{product.Desc}</div>
                <button className='product-btn'
                    onClick={()=> dispatch(addToCart({
                      id: product.id,
                      title: product.Title,
                      desc: product.Desc,
                      price: product.price,
                      image: product.image.url
                    }))}
                >add to cart</button>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;

