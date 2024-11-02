import React from "react";
import { useToDoListContext } from "./TodoProvider";

const InputBox = () => {
  const { setInput, newTodo, SetAdd } = useToDoListContext();

  return (
    <div className="inputs">
      <input
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={setInput}
        onKeyDown={SetAdd}
      />
    </div>
  );
};
export default InputBox;
