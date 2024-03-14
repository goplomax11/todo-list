import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import TodoList from "components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import Grid from "@mui/material/Grid";
import AddTodo from "components/AddTodo";
import {
  addTodo,
  deleteTodo,
  toggleComplete,
  updateTodoList,
} from "./redux/slices/todoSlice";
import { TodoItem } from "interfaces";
import Header, { HeaderConfigValues } from "components/Header";
import { SelectChangeEvent } from "@mui/material/Select";

const App = () => {
  const [addTodoInputValue, setAddTodoInputValue] = useState("");
  const todoList = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState(HeaderConfigValues.ALL);

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todoList") || '""');
    if (storedTodoList) {
      dispatch(updateTodoList(storedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const onAddTodoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodoInputValue(event.target.value);
  };

  const onAddTodoIconClick = () => {
    dispatch(
      addTodo({
        title: addTodoInputValue,
      })
    );
    setAddTodoInputValue("");
  };

  const onDeleteIconClick = (id: number) => {
    dispatch(
      deleteTodo({
        id,
      })
    );
  };

  const onToggleCompleteChange = (todoItem: TodoItem) => {
    dispatch(
      toggleComplete({
        ...todoItem,
      })
    );
  };

  const onFilterChange = (event: SelectChangeEvent) => {
    setCurrentFilter(event.target.value as any);
  };

  const filteredTodoList = useMemo(
    () =>
      todoList.filter(
        (todoItem) =>
          currentFilter === HeaderConfigValues.ALL ||
          (todoItem.completed &&
            currentFilter === HeaderConfigValues.COMPLETED) ||
          (!todoItem.completed && currentFilter === HeaderConfigValues.ACTIVE)
      ),
    [todoList, currentFilter]
  );

  return (
    <div className="app">
      <Grid item xs={12} md={6}>
        <Header selectValue={currentFilter} onSelectChange={onFilterChange} />
        <AddTodo
          value={addTodoInputValue}
          onChange={onAddTodoInputChange}
          onSubmit={onAddTodoIconClick}
        />
        <TodoList
          todoList={filteredTodoList}
          onItemDelete={onDeleteIconClick}
          onToggleCompleteChange={onToggleCompleteChange}
        />
      </Grid>
    </div>
  );
};

export default App;
