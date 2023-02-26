import React from 'react'
import {useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

function Home() {
  const {workouts, dispatch} = useWorkoutsContext()

    useEffect(()=> {
const fetchWorkouts = async () => {
const res = await fetch('/api/workouts')
const json = await res.json()

if(res.ok){
dispatch({type: 'SET_WORKOUTS', payload: json})
}

}

fetchWorkouts()
},[dispatch])


  return (
    <div className="home">
        <div className='workouts'>
        {
        workouts && workouts.map((workout, i) =>(
          <div>
        <WorkoutDetails key={workout._id} workout={workout} />
        </div>
        ))
        
        }
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home