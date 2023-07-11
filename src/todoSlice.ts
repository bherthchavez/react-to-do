/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "./app/store";
import { firestore } from "./firebase";
import { InitialState, ToDo } from "./types/Notes";
import { WritableDraft } from "immer/dist/internal.js";



export const fetchTodo = createAsyncThunk("todo/fetchTodo", async (_data, { rejectWithValue }) => {
  try {
    const querySnapshot = await firestore.collection('todo').get();
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return items;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});



// Define the initial state using that type
const initialState: InitialState = {
  todo: [],
  loading: false,
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTask: (_state, action) => {
      const { task, completed } = action.payload;
      
      firestore.collection('todo')
        .add({ task, completed })
        .then(() => {
          console.log( "Added new task.")
        })
        .catch((error) => {
          console.log(error.message)
        });
    },
    updateCompleted: (_state, action) => {
      const { id, task,  completed } = action.payload;
      firestore
      .collection("todo")
      .doc(id)
      .update({ task, completed})
      .then(() => {
        console.log("updated task");
      })
      .catch((error) => {
        console.log(error.message);
      });
    },
    updateTask: (_state, action) => {
      const { id, task,  completed } = action.payload;
      firestore
      .collection("todo")
      .doc(id)
      .update({ task, completed})
      .then(() => {
        console.log("updated task");
      })
      .catch((error) => {
        console.log(error.message);
      });
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteTask: (_state, action) => {
      const { id } = action.payload;
      firestore.collection('todo')
      .doc(id)
      .delete()
      .then(() => {
       console.log("deleted task!")
      })
      .catch((error) => {
        console.log(error.message)
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // The pending case sets the loading state to true
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // The fulfilled case updates the loading state to false and stores the fetched users' data
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.todo = action.payload.sort((a:any, b:any) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1)  as WritableDraft<ToDo>[]
      })
      // The rejected case sets the loading state to false and stores the error message.
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
});

export const { addTask, updateTask, updateCompleted, deleteTask } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.toDo;

export default todoSlice.reducer;
