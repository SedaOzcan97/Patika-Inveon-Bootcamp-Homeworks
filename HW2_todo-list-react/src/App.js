import React, {useState, useEffect} from 'react';
import './App.css';

import Form from './components/form';
import TodoList from './components/todoList';

function App() {
  //state aim
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const[filteredTodos, setFilteredTodos] = useState([]);
  useEffect(() => {// firstly on start
    getLocalTodos();
  }, []);

  //use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  //funtions
  const filterHandler =() => {
    switch (status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false)); 
        break;
      default:
        setFilteredTodos(todos);
        break;   
    }
  }
  //console.log(filteredTodos);
  //save local storage
  const saveLocalTodos = () => {
  
    localStorage.setItem('todos', JSON.stringify(todos));
   

  };
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
      }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
      }

  };
  return (
    <div className="App">
      <header>
      <h1>#HOMEWORK2 TO- DO LİST WİTH REACT</h1>
      </header>

      <Form  setStatus={setStatus} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
      
    </div>
  );
}

export default App;