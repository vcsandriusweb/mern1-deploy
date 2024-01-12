import {useState} from 'react'
import {useWorkoutContext} from '../hooks/useWorkoutContext'

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const {dispatch} = useWorkoutContext()
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const pratimas = {title, load, reps}
        const response = await fetch('https://mern1-backend.onrender.com/api/pratimai', {
            method: 'POST',
            body: JSON.stringify(pratimas),
            headers: {'Content-Type': 'application/json'}
        })
        const json = await response.json()
        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setEmptyFields([])
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('Naujas pratimas pridėtas')
            dispatch({type:'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Pridėti naują pratimą</h3>
            <label>Pratimo pavadinimas:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Svoris (kg):</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Pratimo pakartojimai:</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>Pridėti pratimą</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
}
 
export default WorkoutForm;