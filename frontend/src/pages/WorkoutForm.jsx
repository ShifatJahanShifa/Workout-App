import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = ()=>{
    const { dispatch }=useWorkoutsContext()
    const [title,setTitle]=useState('')
    const [load,setLoad]=useState('')
    const [reps,setReps]=useState('')
    const [error,setError]=useState('')
    const [emptyFields,setEmptyFields]=useState([])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const workout= {title,load,reps}

        const response= await fetch('http://localhost:4000/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json= await response.json()
        if(!response.ok)
        {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        else 
        {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log("new workout added",json)
            dispatch ({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-slate-100 max-w-[500px] mt-10 mx-auto p-10">
            <h2 className="text-xl text-blue-900">Add a new workout</h2>
            <p><span className="text-red-400 text-[11px]">*</span> means required field</p><br/>
            <label>Exercise Title:<span className="text-red-400">*</span> </label>
            <input className="mt-1 p-1 w-[90%] border `${emptyFields.includes('title')? 'border-red-300':'border-white'}`" 
            type="text" id="title" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder="add exercise title"/>
            
            <label>Load:<span className="text-red-400">*</span></label>
            <input className="mt-1 p-1 w-[90%] border `${emptyFields.includes('load')? 'border-red-300':'border-white'}`"
             type="number" id="load" onChange={(e)=>setLoad(e.target.value)} value={load} placeholder="add load number"/>

            <label>Reps:<span className="text-red-400">*</span> </label>
            <input type="number" id="reps" className="mt-1 p-1 w-[90%] border `${emptyFields.includes('reps')? 'border-red-300':'border-white'}`" 
            onChange={(e)=>setReps(e.target.value)} value={reps} placeholder="add reps number"/>

            <button className="bg-green-300 p-3 rounded-lg hover:bg-green-500 text-center mx-auto w-fit">Add Workout</button>            
            {error && 
            <div className="text-red-500 text-[12px]">
                <i class="fa-solid fa-triangle-exclamation">&nbsp;</i>
                {error}
            </div>
            }
        </form>
    )
}

export default WorkoutForm