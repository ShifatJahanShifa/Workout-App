const express=require('express')
const {
    getAllWorkouts,
    singleWorkout,
    postWorkout,
    deleteWorkout,
    updateWorkout
} =require('../controllers/workoutController')
const router=express.Router()

// get all workouts
router.get('/',getAllWorkouts)

// get a single workout
router.get('/:id',singleWorkout)

// post a workout
router.post('/',postWorkout)

// delete a workout
router.delete('/:id',deleteWorkout)

// update a workout
router.patch('/:id',updateWorkout)

module.exports=router