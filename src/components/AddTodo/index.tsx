import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import React, { FC } from "react";

import "./index.css";

const CustomIconButton = styled(IconButton)(() => ({
  margin: "auto",
  marginLeft: 8,
}));

interface AddTodoProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const AddTodo: FC<AddTodoProps> = ({ value, onChange, onSubmit }) => {
  return (
    <div className="add-task-wrapper">
      <TextField
        fullWidth
        label="Add todo"
        id="fullWidth"
        value={value}
        onChange={onChange}
      />
      <CustomIconButton
        onClick={onSubmit}
        disabled={!value}
        edge="end"
        aria-label="add"
      >
        <AddIcon />
      </CustomIconButton>
    </div>
  );
};

export default AddTodo;
