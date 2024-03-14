import { FC } from "react";
import TodoListCard from "../TodoListCard";
import { TodoItem } from "../../interfaces";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  DropResult,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import List from "@mui/material/List";
import { useDispatch } from "react-redux";
import { updateTodoList } from "../../redux/slices/todoSlice";

interface TodoListProps {
  todoList: TodoItem[];
  onItemDelete: (id: number) => void;
  onToggleCompleteChange: (todoItem: TodoItem) => void;
}

const reorder = (
  list: TodoItem[],
  startIndex: number,
  endIndex: number
): TodoItem[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  marginBottom: 10,
  ...draggableStyle,
});

const TodoList: FC<TodoListProps> = ({
  todoList,
  onItemDelete,
  onToggleCompleteChange,
}) => {
  const dispatch = useDispatch();
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      todoList,
      result.source.index,
      result.destination.index
    );

    dispatch(updateTodoList(items));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {todoList.map((todoListItem, index) => (
              <Draggable
                key={todoListItem.id}
                draggableId={String(todoListItem.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(provided.draggableProps.style)}
                  >
                    <TodoListCard
                      key={Number(todoListItem.id)}
                      todoListItem={todoListItem}
                      onDelete={onItemDelete}
                      onToggleCompleteChange={onToggleCompleteChange}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
