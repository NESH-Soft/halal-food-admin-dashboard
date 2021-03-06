import {
    GET_PRODUCT,
    GET_PRODUCT_INFO,
    UPLOAD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    EDIT_FORM,
    CLEAR_EDIT_FORM,
    CLEAR_APPLICATION_STATE,
    CLEAR_SUCCESS
} from '../type'

export default (state,action)=>{
    switch(action.type){
           case GET_PRODUCT:
                return{
                ...state,
                products: action.payload.products,
        
            }
            case GET_PRODUCT_INFO:
                return{
                ...state,
                productInfo: action.payload.productInfo,

            }
            case UPLOAD_PRODUCT:
                return{
                ...state,
                products: [...state.products, action.payload.newProduct],
                success:action.payload.success,
           
                }
                case DELETE_PRODUCT:
                return {
                ...state,
                products: state.products.filter(product => product._id !==  action.payload.deletedProduct._id),
              
                }

            case  UPDATE_PRODUCT:
                return{
                ...state,
                products:state.products.map(product=>product._id === action.payload.updatedProduct._id ? action.payload.updatedProduct:product),
                success:action.payload.success,
             
                }
  

            case EDIT_FORM:
                return{
                ...state,
                editForm:action.payload
                         
                }

           case CLEAR_EDIT_FORM:
                return{
                ...state,
                 editForm:null
                } 

    
            case CLEAR_APPLICATION_STATE:
            return{
                products: [],
                productInfo:[],
                editForm:{},
                invoiceProducts:[],
                serverMessage: null,
                success: false,
            }
            case CLEAR_SUCCESS:
                return{
                    ...state,
                    success:false
                }

        default:
            return state
    }
}
