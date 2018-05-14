import I from 'immutable'
import {SET_NO_MORE_DATA, SET_PRODUCT_DETAIL, SET_PRODUCT_LIST} from "../actions/AppAction";
const initialState = I.fromJS({
    'productList': I.List(),
    'productDetail': I.fromJS({}),
    'noMoreData' : false
})

export default function AppReducer(state=initialState,action){
    switch (action.type){
        case SET_PRODUCT_LIST :
            return state = state.set('productList',action.payload)
        case SET_PRODUCT_DETAIL :
            return state = state.set('productDetail',action.payload)
        case SET_NO_MORE_DATA :
            return state = state.set('noMoreData',action.payload)
        default:
            return state
    }
}