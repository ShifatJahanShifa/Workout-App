import { useEffect, useState } from "react"
import WorkoutDetails from '../components/WorkoutDetails'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx"

const Home = ()=>{
    // const [workout,setWorkout]=useState(null)
    const {workouts, dispatch} = useWorkoutsContext()
    // firing once
    useEffect(()=>{
        const fetchWorkout = async () =>{
        try{
            const response=await fetch('http://localhost:4000/api/workouts')
            const json=await response.json(); // array of objects

            if(response.ok)
            {
                // setWorkout(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        catch(error)
        {
            console.log("error: ",error)
        }
    }
        fetchWorkout()
    }, [])   // dispatch

    return(
        <div className="">
            <div>
                {workouts && workouts.map((e)=>(
                    <WorkoutDetails key={e._id} workout={e} />
                ))}
            </div>
        </div>
    )
}

export default Home