import { useState, useEffect } from 'react'
import './App.css'
import { getAllTasks, createTask, toggleTask, deleteTask } from './api'

function App() {
  const [tasks, setTasks] = useState([])
  const [label, setLabel] = useState('')

  useEffect(() => {
    let mounted = true
    getAllTasks()
      .then((data) => {
        if (mounted) setTasks(data)
      })
      .catch((err) => console.error('getAllTasks error', err))
    return () => {
      mounted = false
    }
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    const value = label.trim()
    if (!value) return
    try {
      const newTask = await createTask(value)
      setTasks((prev) => [newTask, ...prev])
      setLabel('')
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la création de la tâche')
    }
  }

  async function handleToggle(id) {
    try {
      const updated = await toggleTask(id)
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      console.error(err)
      alert('Erreur lors du basculement de la tâche')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer cette tâche ?')) return
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <form onSubmit={handleAdd} style={{ marginBottom: 12 }}>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {tasks.map((task) => {
          const done = task.done ?? task.isDone
          return (
            <li key={task.id} style={{ marginBottom: 8 }}>
              <span style={{ marginRight: 8, textDecoration: done ? 'line-through' : 'none' }}>{task.label}</span>
              <button onClick={() => handleToggle(task.id)} style={{ marginRight: 8 }}>
                {done ? 'Uncheck' : 'Check'}
              </button>
              <button onClick={() => handleDelete(task.id)}>Supprimer</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
