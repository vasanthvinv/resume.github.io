import produce from "immer";
import _ from "lodash";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import "./App.css" ;

type Action =
  | { type: "setAdd" }
  | { type: "setChange"; payload: string }
  | { type: "setDelete"; payload: string }
  | { type: "setCompletedDelete" }
  | { type: "select-all" }
  | { type: "setFilteredTodo"; payload: string }
  | { type: "setnewTodo"; payload: string };

interface Todo {
  data: string;
  completed: boolean;
}

interface ContextProps {
  todos: Todo[];
  filteredTodo: Todo[];
  newTodo: string;
  SetChange: (i: string) => void;
  setInput: React.ChangeEventHandler<HTMLInputElement>;
  SetAdd: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  SetDelete: (item: string) => void;
  setCompletedDelete: () => void;
  selectAll: () => void;
  setFilteredTodo: (value: string) => void;
}

interface State {
  todos: Todo[];
  newTodo: string;
  filter: string;
  filteredTodo: Todo[];
}

const initialState: State = {
  todos: [],
  newTodo: "",
  filter: "All",
  filteredTodo: [],
};

const reducer = produce((state: State, action: Action) => {
  switch (action.type) {
    case "setnewTodo":
      state.newTodo = action.payload;
      break;

    case "setAdd":
      state.todos = [...state.todos, { data: state.newTodo, completed: false }];
      state.filteredTodo = state.todos;
      state.newTodo = "";
      break;

    case "setChange":
      const index = _.findIndex(
        state.todos,
        (item) => item.data === action.payload
      );
      if (index !== -1) {
        state.todos[index].completed = !state.todos[index].completed;
      }
      break;

    case "setDelete":
      state.todos = _.filter(
        state.todos,
        (todo) => todo.data !== action.payload
      );
      state.filteredTodo = state.todos;
      break;

    case "setCompletedDelete":
      state.todos = _.filter(state.todos, (todo) => !todo.completed);
      break;

    case "setFilteredTodo":
      switch (action.payload) {
        case "Active":
          state.filteredTodo = _.filter(state.todos, (todo) => !todo.completed);
          break;
        case "Complete":
          state.filteredTodo = _.filter(state.todos, (todo) => todo.completed);
          break;
        default:
          state.filteredTodo = state.todos;
      }
  }
});

const ToDoListContext = createContext<ContextProps | null>(null);

function TodoProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({ type: "setnewTodo", payload: event.target.value });
  };

  const SetChange = (value: string) => {
    dispatch({ type: "setChange", payload: value });
    dispatch({ type: "setFilteredTodo", payload: state.filter });
  };

  const SetAdd = (event: { key: string }) => {
    if (event.key === "Enter") {
      dispatch({ type: "setAdd" });
    }
  };

  const selectAll = () => {
    dispatch({ type: "select-all" });
  };
  const SetDelete = (i: string) => {
    dispatch({ type: "setDelete", payload: i });
    dispatch({ type: "setFilteredTodo", payload: state.filter });
  };

  const setCompletedDelete = () => {
    dispatch({ type: "setCompletedDelete" });
    dispatch({ type: "setFilteredTodo", payload: state.filter });
  };

  const setFilteredTodo = (value: string) => {
    dispatch({ type: "setFilteredTodo", payload: value });
  };

  const value = {
    todos: state.todos,
    filteredTodo: state.filteredTodo,
    newTodo: state.newTodo,
    selectAll,
    SetChange,
    SetAdd,
    SetDelete,
    setCompletedDelete,
    setInput,
    setFilteredTodo,
  };

  return (
    <ToDoListContext.Provider value={value}>
      {children}
    </ToDoListContext.Provider>
  );
}

export const useToDoListContext = () => {
  const context = useContext(ToDoListContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};

export default TodoProvider;
