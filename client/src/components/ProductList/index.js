import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { updateProducts } from '../../slices/productSlice'; // Import Redux action
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const dispatch = useDispatch();
  
  // Access Redux state using useSelector
  const { products, currentCategory } = useSelector((state) => state.product);

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      // Dispatch action to update products in Redux store
      dispatch(updateProducts(data.products));

      // Cache products in IndexedDB
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      // Load products from IndexedDB if no data and not loading
      idbPromise('products', 'get').then((products) => {
        dispatch(updateProducts(products));
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;

// import { useEffect } from 'react';
// import ProductItem from '../ProductItem';
// import {useDispatch, useSelector} from 'react-redux';
// // import { useStoreContext } from '../../utils/GlobalState';
// import { UPDATE_PRODUCTS } from '../../utils/actions';
// import { useQuery } from '@apollo/client';
// import { QUERY_PRODUCTS } from '../../utils/queries';
// import { idbPromise } from '../../utils/helpers';
// import spinner from '../../assets/spinner.gif';

// function ProductList() {
//   // const [state, dispatch] = useStoreContext();

//   // const { currentCategory } = state;

//   const dispatch = useDispatch();
//   const {products, currentCategory} = useSelector((state) => state.product);

//   const { loading, data } = useQuery(QUERY_PRODUCTS);

//   useEffect(() => {
//     if (data) {
//       dispatch({
//         type: UPDATE_PRODUCTS,
//         products: data.products,
//       });
//       data.products.forEach((product) => {
//         idbPromise('products', 'put', product);
//       });
//     } else if (!loading) {
//       idbPromise('products', 'get').then((products) => {
//         dispatch({
//           type: UPDATE_PRODUCTS,
//           products: products,
//         });
//       });
//     }
//   }, [data, loading, dispatch]);

//   function filterProducts() {
//     if (!currentCategory) {
//       return state.products;
//     }

//     return state.products.filter(
//       (product) => product.category._id === currentCategory
//     );
//   }

//   return (
//     <div className="my-2">
//       <h2>Our Products:</h2>
//       {state.products.length ? (
//         <div className="flex-row">
//           {filterProducts().map((product) => (
//             <ProductItem
//               key={product._id}
//               _id={product._id}
//               image={product.image}
//               name={product.name}
//               price={product.price}
//               quantity={product.quantity}
//             />
//           ))}
//         </div>
//       ) : (
//         <h3>You haven't added any products yet!</h3>
//       )}
//       {loading ? <img src={spinner} alt="loading" /> : null}
//     </div>
//   );
// }

// export default ProductList;
