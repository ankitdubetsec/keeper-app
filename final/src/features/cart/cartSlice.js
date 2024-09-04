import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5500/api/v1/notes";

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);
      //console.log(resp.data);
      return resp.data.note;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const addTodo = createAsyncThunk("todos/addTodo", async (note) => {
  console.log(note);
  try {
    const response = await axios.post(url, note);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// export const updateTodo = createAsyncThunk('todos/updateTodo', async (id,note) => {
//   try{
//     const response = await axios.put(`http://localhost:5500/api/v1/notes/${id}`, note);
//     return response.data;
//   }
//   catch (error) {
//     console.log(error)
//   }

// });

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  try {
    console.log(id);
    await axios.delete(
      `https://keeper-app-mmhh.onrender.com/api/v1/notes/${id}`
    );
    return id;
  } catch (error) {
    console.log(error);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
        console.log(state.cartItems);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems.filter(
          (todo) => todo._id !== action.payload
        );
      });
  },
});

//console.log(cartItems);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
