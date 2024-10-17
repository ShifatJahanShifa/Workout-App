import { useEffect, useState } from "react"

const Home = ()=>{
    const [workout,setWorkout]=useState(null)

    // firing once
    useEffect(()=>{
        const fetchWorkout = async () =>{
        try{
            const response=await fetch('http://localhost:4000/api/workouts')
            const json=await response.json(); // array of objects

            if(response.ok)
            {
                setWorkout(json)
            }
        }
        catch(error)
        {
            console.log("error: ",error)
        }
    }
        fetchWorkout()
    }, []) 

    return(
        <div className="home">
            <div>
                {workout && workout.map((e)=>(
                    <p key={e._id}>{e.title}</p>
                ))}
            </div>
        </div>
    )
}

export default Home