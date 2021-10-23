import React, { useState, useRef, useEffect } from 'react'; // permite usar 'HTML'
import { v4 as uuidv4 } from 'uuid'
import { TodoList } from './components/TodoList';

const KEY = 'todoApp.todos'

export function App() {
    const [todos, setTodos] = useState([{'id':1, 'task':'limpiar', 'completed':false}]);

    const todoTaskRef = useRef();

    useEffect(()=> {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
            setTodos(storedTodos);
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos), [todos])
    });
    
    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todoFind = newTodos.find((todoElement) => {
            return todoElement.id === id;
        });
        todoFind.completed = !todoFind.completed;
        setTodos(newTodos)
    }
    
    const handleTodoAdd = ()=> {   
        const task = todoTaskRef.current.value;
        if(task === '') return;

        setTodos( (prevState)=> {
            return [...prevState, { 'id':uuidv4(), task, 'completed': false }];
        })

        todoTaskRef.current.value = null;
    }

    const handleClearAll = () => {
        const newState = todos.filter((todosElement) => {
            return todosElement.completed === false;
        })
        setTodos(newState);
    }
    
    return (
        <>
            <TodoList todos={ todos } toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type="text" placeholder='Nueva Tarea...' />
            <button onClick={handleTodoAdd} >➕</button>
            <button onClick={handleClearAll} >🗑</button>
            <div>Te quedan {todos.filter((todosElement) => {return todosElement.completed === false}).length} tareas por terminar</div>
        </>
        )
}