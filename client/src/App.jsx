import './App.css'
import Products from './components/Products/Products.jsx';
import Categories from './components/Categories/Categories.jsx';
import StoreContext from './hooks/storeContext';
import { useState } from 'react';
import Cart from './components/Cart/Cart.jsx';

export default function App() {
  const [filter, setFilter] = useState("/products?populate=*");
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <>
      <Cart/> 
      <StoreContext.Provider
       value={{
          filter, setFilter,
          selectedCategories, setSelectedCategories
       }}
      >
        <Categories/>
        <Products />
      </StoreContext.Provider>
    </>
  );
}



