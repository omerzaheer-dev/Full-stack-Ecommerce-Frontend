import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    cart:null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartDetails : (state,action)=>{
        state.cart = action.payload;
    }
  },
})
export const { setCartDetails } = cartSlice.actions

export default cartSlice.reducer