import React, { FC, useState } from "react";
import { TodoItem } from "interfaces";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import styled from "@emotion/styled";
import { Input } from "@mui/material";
import { useDispatch } from "react-redux";
import { editTodo } from "../../redux/slices/todoSlice";
import "./index.css";

interface TodoListCardProps {
  todoListItem: TodoItem;
  onDelete: (id: number) => void;
  onToggleCompleteChange: (todoItem: TodoItem) => void;
}

const CustomListItem = styled(ListItem)(() => ({
  paddingRight: 80,
  "&:not(:last-child)": {
    marginBottom: 10,
  },
}));

const CustomInput = styled(Input)(() => ({
  "&:before": {
    borderBottom: "none",
    content: "none",
  },
}));

const TodoListCard: FC<TodoListCardProps> = ({
  todoListItem,
  onDelete,
  onToggleCompleteChange,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(todoListItem.title);
  const dispatch = useDispatch();

  const onEditIconClick = () => {
    setIsEditMode(true);
  };

  const onSaveIconClick = () => {
    dispatch(
      editTodo({
        ...todoListItem,
        title: inputValue,
      })
    );
    setIsEditMode(false);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <CustomListItem
      className="todo-list-card"
      secondaryAction={
        <>
          {isEditMode ? (
            <IconButton edge="end" aria-label="save" onClick={onSaveIconClick}>
              <CheckIcon />
            </IconButton>
          ) : (
            <IconButton edge="end" aria-label="edit" onClick={onEditIconClick}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(todoListItem.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <Checkbox
        checked={todoListItem.completed}
        onChange={() => onToggleCompleteChange(todoListItem)}
      />
      <ListItemText>
        <CustomInput
          disabled={!isEditMode}
          value={isEditMode ? inputValue : todoListItem.title}
          onChange={onInputChange}
        />
      </ListItemText>
    </CustomListItem>
  );
};

export default TodoListCard;
