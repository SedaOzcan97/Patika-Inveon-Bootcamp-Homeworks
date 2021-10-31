import React from "react";

import Todo from './todo';
const TodoList = ({todos, setTodos, filteredTodos}) => {
    
   // const [todos, setTodos] = useState([]);
    return(
        <div className="todo-container">
        <ul className="todo-list">
            {filteredTodos.map((todo) => (
            <Todo
             todo={todo} 
             setTodos={setTodos} 
             todos={todos} 
             key={todo.id}
            text={todo.text} 
            />
            ))}
        </ul>
      </div>
    );
};
export default TodoList;