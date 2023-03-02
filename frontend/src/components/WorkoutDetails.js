import React, { useState, useEffetct } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch, Grid, Select } from "@mui/material";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const [proteinBrands, setProteinBrands] = useState({
    name: [],
    whey: 0,
  });

  async function handleClick() {
    const res = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <stong>Id: </stong>
        {workout._id}
      </p>
      <p>
        <stong>Load (kg): </stong>
        {workout.load}
      </p>
      <p>
        <stong>Reps: </stong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <p>State: {`${workout.isActive}`}</p>
      <span style={{ cursor: "pointer" }} onClick={handleClick}>
        <DeleteIcon />
      </span>
    </div>
  );
}

export default WorkoutDetails;
