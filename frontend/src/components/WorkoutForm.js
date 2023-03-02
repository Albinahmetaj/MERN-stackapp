import React, { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";

function WorkoutForm({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [isActive, setIsActive] = useState(Boolean);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [workouts, getWorkouts] = useState([]);
  const [getIds, setGetIds] = useState([]);

  const handleChange = (getIds) => {
    setGetIds({ getIds });
  };

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
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      setTitle("");
      setLoad("");
      setReps("");
      setIsActive(Boolean);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  }

  /*
  async function handleClick(id) {
    const res = await fetch("/api/workouts/" + id, {
      method: "PATCH",
    });

    const json = await res.json();
    setID(json._id);
    setTitle(json.title);
    if (res.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
    }
  }*/

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            autoWidth
            label="Status"
            className={emptyFields.includes("status") ? "error" : ""}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />

        <label>Reps (in kg):</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />

        <button>Add workout</button>
        {error && <div className="error">{error}</div>}

        <br />
        <label>Update Title</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <Select
          isMulti
          value={getIds}
          onChange={handleChange}
          options={workout}
        />

        <button>Update Title</button>
      </form>
    </>
  );
}

export default WorkoutForm;
