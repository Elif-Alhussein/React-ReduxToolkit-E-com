import '../Checkbox/Checkbox.css';
import qs from 'qs';
import StoreContext from '../../hooks/storeContext';
import {useContext, useEffect} from 'react';

export default function Checkbox({ category }){
    const {setFilter, selectedCategories, setSelectedCategories} =useContext(StoreContext);

    useEffect(()=>{
        const query = qs.stringify({
            filters: {
                categories: {
                    id : {
                        $in: selectedCategories
                    }
                }
            }
        })
        setFilter(import.meta.env.VITE_API_URL + "/products?populate=*&" + query);
    },[selectedCategories])

    const handleFilterCategory = (e) => {
        const selectedID = e.target.dataset.category
        const isChecked = e.target.checked

        setSelectedCategories(selectedCategories => {
            if(isChecked) return [...selectedCategories, selectedID]
            return selectedCategories.filter(id => id !== selectedID)
        })
    }

    return(
        <div className="checkbox-container">
            <label className="toggler-wrapper style-1">
                <input 
                    type="checkbox"
                    data-category={category.id}
                    onChange={handleFilterCategory}
                />
                <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                </div>
                
            </label>
            <span className="category-title">{category.title}</span>
        </div>
    );
}



