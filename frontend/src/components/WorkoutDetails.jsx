import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// date -fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const WorkoutDetails = ({workout}) =>{

    const { dispatch }=useWorkoutsContext()
    const handleClick=async()=>{
        const response= await fetch('http://localhost:4000/api/workouts/'+workout._id,{
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok)
        {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return(
        <div className="h-fit mt-8 mx-auto border rounded-lg bg-slate-300 flex flex-col w-3/5 px-5 py-7">
            <h4 className="text-blue-800 font-medium">{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Load (kg): </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span onClick={handleClick} className="bg-white hover:bg-slate-100 rounded border border-gray-400 mt-1 cursor-pointer p-1 w-fit">
            <i class="fa-solid fa-trash-can"></i>&nbsp; delete</span>
        </div>
    )
}

export default WorkoutDetails