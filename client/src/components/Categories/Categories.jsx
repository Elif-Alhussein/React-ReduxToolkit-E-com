import '../Categories/Categories.css';
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Checkbox from '../Checkbox/Checkbox';

const Categories = () => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL}/api/categories?populate=*`
        );
        setCategories(response.data.data); 
        setError(null); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div  className="categories-container">
      {loading ? (
        <p>Loading Categories...</p>
      ) : error ? (
        <p>Error fetching Categories: {error.message}</p>
      ) : (
        <div className='categories'>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <Fragment key={category.id}>
                  <Checkbox category={category} />
              </Fragment>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;




