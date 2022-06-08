import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
import {
  productsReducer,
  CreateproductsReducer,
  selectedProductsReducer,
  DeleteProductsReducer,
  UpdateProductsReducer,
  productReducer,
  dataProducts,
} from "./productsReducer";
const rootReducer = combineReducers({
  auth: userReducer,
  Createproducts: CreateproductsReducer,
  allProducts: productsReducer,
  dataProduct: dataProducts,
  products: productReducer,
  deleteProduct: DeleteProductsReducer,
  product: selectedProductsReducer,
  updateProduct: UpdateProductsReducer,
});

export default rootReducer