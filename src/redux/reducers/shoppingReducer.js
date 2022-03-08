import { GetProduct } from 'api/Product.api';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADJUST_QUANTITY,
    LOAD_CURRENT_ITEM,
    GET_BASKET_LENGTH,
    GET_ITEM_FROM_CART
} from 'redux/types';

const initialShopState = {
    card: [],
    currentItem : {},
};

 export const ShoppingReducer = (state = initialShopState, action) => {    
    switch (action.type) {
        case ADD_TO_CART:
            const productInCart = state.card.find(item => item.productId === action.payload.id);
            if(productInCart) {
                return {
                    ...state,
                    card: state.card.map(item => {
                        if(item.productId === action.payload.id) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        }
                        return item;
                    })
                }
            } else {
                return {
                    ...state,
                    card: [...state.card, 
                        {
                            productId: action.payload.id,
                            quantity: action.payload.qty,
                            colorId: action.payload.colorId,
                            GarntyId: action.payload.GarntyId,
                        }
                    ]
                }
            }


        case GET_ITEM_FROM_CART:
            const itemProduct = state.card.find(item => item.productId === action.payload.id);
            if(itemProduct) {
                return {
                    ...state,
                    currentItem: itemProduct
                }
            } else {
                return {
                    ...state,
                    currentItem: {}
                }
            }


        default:
            return state
    }
};