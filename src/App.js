import React, {useEffect} from 'react';
import TodoList from './Todo/todoList';
import Context from './context'
import Loader from './loader'
import Modal from './Modal/modal';


const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
        .then(response => response.json())
        .then(todos => {
          setTimeout(() => {
            setTodos(todos)
            setLoading(false)
          }, 2000)
          
        })
  }, [])

  function toggleTodo(id) {
    setTodos(todos.map(item => {
      if(item.id === id) {
        item.completed = !item.completed
      }
      return item
    })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(item => item.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }
  return (
    <Context.Provider value={{removeTodo:removeTodo}}>
      <div className="wrapper">
        <h1>React</h1>
        <Modal></Modal>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo}></AddTodo>
        </React.Suspense>
        
        {loading && <Loader></Loader>}
        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo}></TodoList> : loading ? null : <p>No Todos</p>}
       
      </div>
    </Context.Provider>
  );
}

export default App;
