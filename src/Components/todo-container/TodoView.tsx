import TodoProvider from "./TodoProvider";
import FilterBar from "./FilterBar";
import InputBox from "./InputBox";
import TodoListView from "./TodoListView";


const TodoView = () => {
  return (
    <div className="body_todo">
    <h2 className="h2_todo">TODOLIST</h2>
    <TodoProvider>
      <InputBox />
      <TodoListView />
      <FilterBar />
    </TodoProvider>
    </div>
  );
};

export default TodoView;
