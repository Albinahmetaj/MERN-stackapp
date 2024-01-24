import React, { useState, useEffetct } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch, Grid, Select, Button } from "@mui/material";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

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
  //comment
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Id: </strong>
        {workout._id}
      </p>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <p>State: {`${workout.isActive}`}</p>
      <span
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          top: "0px",
          right: "0px",
          margin: "5px",
        }}
        onClick={handleClick}
      >
        <DeleteIcon />
      </span>
      <Link
        to={"/update/" + workout._id}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        Update
      </Link>
    </div>
  );
}

export default WorkoutDetails;
