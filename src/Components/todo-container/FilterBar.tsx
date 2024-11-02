import { useToDoListContext } from "./TodoProvider";
import "./App.css";
import _ from "lodash";

const FilterBar = () => {
  const { todos, setFilteredTodo, setCompletedDelete } = useToDoListContext();

  return (
    <div className="fotter">
      <span>
        {_.filter(todos, (todo) => !todo.completed).length} item left!
      </span>
      <span>
        <button className="button_todo" onClick={() => setFilteredTodo("All")}>All</button>
        <button className="button_todo" onClick={() => setFilteredTodo("Active")}>Active</button>
        <button className="button_todo" onClick={() => setFilteredTodo("Complete")}>Completed</button>
      </span>
      <button className="button_todo" onClick={setCompletedDelete}>Clear completed</button>
    </div>
  );
};

export default FilterBar;
