import {
GET_CATEGORY
} from '../type'

export default (state,action)=>{
  switch(action.type){
         case GET_CATEGORY:
              return{
              ...state,
              allCategory: action.payload.category,
          }

      default:
          return state
  }
}
