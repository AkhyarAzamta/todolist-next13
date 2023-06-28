'use client';

import '../src/app/globals.css'
import { useState } from 'react';

const TodoList = () => {
    interface Todo {
        id: number;
        text: string;
        completed: boolean;
        isEditing: boolean;
        editText: string;
    }

    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo: Todo = {
                id: todos.length + 1,
                text: inputValue,
                completed: false,
                isEditing: false,
                editText: '',
            };

            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const handleToggleComplete = (id: number) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleEditTodo = (id: number) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isEditing: true,
                    editText: todo.text,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleCancelEdit = (id: number) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isEditing: false,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleSaveEdit = (id: number) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text: todo.editText,
                    isEditing: false,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleEditInputChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    editText: event.target.value,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <section className='container'>
            <h1 className='bg-black'>Todo List</h1>
            <div>
                <input type="text" value={inputValue} onChange={handleInputChange} />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={todo.editText}
                                    onChange={(e) => handleEditInputChange(todo.id, e)}
                                />
                                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                                <button onClick={() => handleCancelEdit(todo.id)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleComplete(todo.id)}
                                />
                                {todo.text}
                                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default TodoList;
