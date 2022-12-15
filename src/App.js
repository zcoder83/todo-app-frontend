import axios from 'axios'
import { useEffect, useState } from 'react'
import ToDo from './components/ToDo'
import { deleteToDo, addToDo, updateToDo } from './utils/HandleApi'
function App() {
  const [text, setText] = useState('')
  const [toDo, setToDo] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState('')

  const baseUrl = 'https://todo-app-backend-jfdf.onrender.com'
  // add new todo item to database
  const addItem = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(baseUrl + '/save', { text: text })
      console.log(res)
      setText('')
    } catch (error) {
      console.log(error)
    }
  }

  // create function to fetch all todo items from database
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get(baseUrl + '/')
        setToDo(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getItemsList()
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <form className="top" onSubmit={(e) => addItem(e)}>
          <input
            type="text"
            placeholder="Add ToDos..."
            onChange={(e) => {
              setText(e.target.value)
            }}
            value={text}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? 'Update' : 'Add'}
          </div>
        </form>
        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
