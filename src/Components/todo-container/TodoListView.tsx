import _ from "lodash";
import { useToDoListContext } from "./TodoProvider";
import "./App.css";

const TodoListView = () => {
  const { SetDelete, filteredTodo, SetChange } = useToDoListContext();
  
  return (
    <div className="list">
      {_.map(filteredTodo, (item, i) => (
        <div key={i} >
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => SetChange(item.data)}
          />
          <button className="button_todo"  style={{ backgroundColor: "tomato" }} onClick={() => SetDelete(item.data)}>
            X
          </button>
          <span className={`span_todo ${item.completed ? 'strikethrough' : ''}`}>{item.data}</span>
          <br/>
        </div>
      ))}
    </div>
  );
};

export default TodoListView;
