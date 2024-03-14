import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoItem } from "interfaces";

type TodoListState = TodoItem[];

export const todoSlice = createSlice({
  name: "todoList",
  initialState: [] as TodoListState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string }>) => {
      const todo = {
        id: new Date().valueOf(),
        title: action.payload.title,
        completed: false,
      };
      state.push(todo);
    },
    editTodo: (state, action: PayloadAction<TodoItem>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index] = action.payload;
    },
    toggleComplete: (state, action: PayloadAction<TodoItem>) => {
      console.log(action);
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = !action.payload.completed;
    },
    deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    updateTodoList: (_, action: PayloadAction<TodoItem[]>) => {
      return action.payload;
    },
  },
});

export const { addTodo, editTodo, toggleComplete, deleteTodo, updateTodoList } =
  todoSlice.actions;

export default todoSlice.reducer;
