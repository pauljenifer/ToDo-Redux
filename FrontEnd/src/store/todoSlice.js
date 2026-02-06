import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

/* ===================== ASYNC ACTIONS ===================== */

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addTodo = createAsyncThunk("todos/add", async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
});

export const modifyTodo = createAsyncThunk(
  "todos/update",
  async ({ id, data }) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  }
);

export const removeTodo = createAsyncThunk("todos/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

/* ===================== SLICE ===================== */

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
    successMessage: "",
    filter: "all",
    searchQuery: "",
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = "";
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearAllCompleted: (state) => {
      state.items = state.items.filter((t) => !t.completed);
      state.successMessage = "Completed tasks cleared!";
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      /* ADD */
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.successMessage = "Task added successfully!";
      })

      /* UPDATE */
      .addCase(modifyTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload; // 🔥 FIX
        }
        state.successMessage = "Task updated!";
      })

      /* DELETE */
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
        state.successMessage = "Task deleted!";
      })

      /* ERROR */
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

/* ===================== SELECTORS ===================== */

export const selectFilteredTodos = createSelector(
  (state) => state.todos.items,
  (state) => state.todos.filter,
  (state) => state.todos.searchQuery,
  (items, filter, search) => {
    let filtered = items;

    if (filter === "active") filtered = items.filter((t) => !t.completed);
    if (filter === "completed") filtered = items.filter((t) => t.completed);

    if (search) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }
);

export const selectStats = createSelector(
  (state) => state.todos.items,
  (items) => {
    const completed = items.filter((t) => t.completed).length;
    return {
      total: items.length,
      completed,
      active: items.length - completed,
    };
  }
);

export const {
  clearMessages,
  setFilter,
  setSearchQuery,
  clearAllCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
