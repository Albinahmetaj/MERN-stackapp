import React,{useState, useEffect} from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useParams } from 'react-router-dom';
function WorkoutUpdateForm() {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [isActive, setIsActive] = useState(Boolean)
    const [error, setError] = useState(false)
    const [proteinBrands, setProteinBrands] = useState([{
        name:[],
        whey:0
    }])
    const params = useParams();

    
    async function getWorkoutDetails(){
        let result = await fetch(`http://localhost:4000/api/workouts/${params.id}`,{
            method:'GET'
        });
        const json = await result.json();
        console.log(json)
        setTitle(json.title)
    }
    
    const updateWorkout = async () => {
        if(!title,!reps,!load,!isActive,!proteinBrands){
            setError(false);
        }

    }
    
    useEffect(()=>{
        getWorkoutDetails()
    },[])

    async function handleSubmit(e) {
        e.preventDefault();
        const workout = { title, load, reps, isActive };
    
        const response = await fetch("/api/workouts", {
          method: "POST",
          body: JSON.stringify(workout),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(response);
        if (!response.ok) {
          setError(json.error);
        }
        if (response.ok) {
          setError(null);
          
          setTitle('')
          setLoad("");
          setReps("");
          setIsActive(Boolean);
          console.log("new workout added", json);
          dispatch({ type: "UPDATE_WORKOUT", payload: json });
        }
      }
  
    return (
        <>
        <form >
        <h3>Update a New Workout</h3>
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
         
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          
        />

        <label>Reps (in kg):</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
         
        />

        <button>Add workout</button>
        
      </form>
    </>
  )
}

export default WorkoutUpdateForm