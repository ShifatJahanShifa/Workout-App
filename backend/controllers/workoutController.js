const workoutdata=require('../models/workout')
const mongoose=require('mongoose')

// get all workouts
const getAllWorkouts = async(req,res)=>{
    const workouts=await workoutdata.find({}).sort({createdAt: -1})   // newest comes first
    res.status(200).json(workouts)
}

// get a single workout
const singleWorkout = async(req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({msg: "no such workout"})
    }
    const workout= await workoutdata.findById(id)

    if(!workout)
    {
        return res.status(404).json({msg: "no such workout"})
    }

    res.status(200).json(workout);
}

// create a new workout
const postWorkout=async(req,res)=>{
    const {title,reps,load}=req.body

    let emptyFields =[]
    if(!title) 
    {
        emptyFields.push('title')
    }
    if(!load) 
    {
        emptyFields.push('load')
    }
    if(!reps) 
    {
        emptyFields.push('reps')
    }
    // if(emptyFields.length>0)
    // {
    //     return res.status(400).json({error: error.message, emptyFields})
    // }

    // add doc to db
    try{
        const workout=await workoutdata.create({title,reps,load})
        res.status(200).json(workout)
    }
    catch(error)
    {
        console.log(error.msg)
        res.status(400).json({error: error.message, emptyFields})
    }
}

// delete a workout
const deleteWorkout=async(req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({msg: "no such workout"})
    }
    const workout= await workoutdata.findOneAndDelete({_id: id})

    if(!workout)
    {
        return res.status(400).json({msg: "no such workout"})
    }

    res.status(200).json(workout);
}


// update a workout
const updateWorkout=async(req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({msg: "no such workout"})
    }
    const workout= await workoutdata.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout)
    {
        return res.status(400).json({msg: "no such workout"})
    }

    res.status(200).json(workout);
}


module.exports = {
    getAllWorkouts,
    singleWorkout,
    postWorkout,
    deleteWorkout,
    updateWorkout
}