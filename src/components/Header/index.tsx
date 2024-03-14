import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC } from "react";
import "./index.css";

export enum HeaderConfigValues {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

const headerSelectConfig = [
  {
    id: 1,
    label: "All",
    value: HeaderConfigValues.ALL,
  },
  {
    id: 2,
    label: "Active",
    value: HeaderConfigValues.ACTIVE,
  },
  {
    id: 1,
    label: "Completed",
    value: HeaderConfigValues.COMPLETED,
  },
];

interface HeaderProps {
  selectValue: HeaderConfigValues;
  onSelectChange: (event: SelectChangeEvent) => void;
}

const Header: FC<HeaderProps> = ({ selectValue, onSelectChange }) => {
  return (
    <div className="header">
      <h1>Todo list</h1>
      <FormControl className="header-input-wrapper">
        <InputLabel id="select-completed">Filter by</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          autoWidth
          value={selectValue}
          label="Filter by"
          onChange={onSelectChange}
        >
          {headerSelectConfig.map((item) => {
            return (
              <MenuItem key={item.id} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;
