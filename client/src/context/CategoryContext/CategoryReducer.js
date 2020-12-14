import {
GET_CATEGORY,
ADD_CATEGORY,
ADD_SUB_CATEGORY,
DELETE_CATEGORY,
DELETE_SUB_CATEGORY
} from '../type'

export default (state,action)=>{
  switch(action.type){
         case GET_CATEGORY:
              return{
              ...state,
              allCategory: action.payload.category,
          }
          case ADD_CATEGORY:
              return{
              ...state,
              allCategory: [...state.allCategory, action.payload.newCategory]
          }
          case ADD_SUB_CATEGORY:
            return{
            ...state,
            allCategory: action.payload.newCategory
        }
        case DELETE_CATEGORY:
          return {
          ...state,
          allCategory: state.allCategory.filter(ctg => ctg._id !==  action.payload.deletedCategory._id),
        
          }
          case DELETE_SUB_CATEGORY:
            return{
            ...state,
            allCategory: action.payload.deletedSubCategory,
        }

      default:
          return state
  }
}
