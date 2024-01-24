import React, { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { createAPIEndpoint, ENDPOINTS } from "./axios";
import axios from "axios";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabelOutlinedInput,
  OutlinedInput,
  InputLabel,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function WorkoutUpdateForm() {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [isActive, setIsActive] = useState(Boolean);
  const [error, setError] = useState(false);
  const [myproteinBrands, setMyProteinBrands] = useState({
    proteinBrands: [
      {
        name: [],
        whey: Number,
      },
    ],
  });
  const params = useParams();
  const [brands, setBrands] = useState([]);

  const handleOptionsChange = (selectedOptions) => {
    const updatedOptions = brands.map((option) => {
      if (selectedOptions.includes(option._id)) {
        return { ...option };
      } else {
        return { ...option };
      }
    });

    setBrands(updatedOptions);
  };

  const handleSubmit = () => {
    const updatedObject = {
      ...myproteinBrands,
      options: brands.filter((option) => option.brands),
    };
    axios
      .put(`http://localhost:4000/api/workouts/${params.id}`, updatedObject)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(
    myproteinBrands.forEach((arr) => {
      console.log(arr);
    })
  );

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.BRANDLIST)
      .fetchAll()
      .then((resp) => {
        setBrands(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(brands);
  async function getWorkoutDetails() {
    let result = await fetch(
      `http://localhost:4000/api/workouts/${params.id}`,
      {
        method: "GET",
      }
    );
    const json = await result.json();
    setTitle(json.title);
  }

  const updateWorkout = async () => {
    let result = await fetch(
      `http://localhost:4000/api/workouts/${params.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title,
          reps,
          load,
          isActive,
          myproteinBrands,
        }),
        header: {
          "Content-Type": "Application/json",
        },
      }
    );
    result = await result.json();
    if (result.ok) {
      console.log(result);
    }
    //if ((!title, !reps, !load, !isActive, !proteinBrands)) {
    //setError(false);
  };

  useEffect(() => {
    getWorkoutDetails();
  }, []);

  return (
    <>
      <form>
        <div>
          <h3>Update a New Workout</h3>
          <label>Exercise Title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <label>Load (in kgs):</label>
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

          <label>Whey:</label>
          <input type="number" />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Brands</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={brands
                .filter((option) => option.brands)
                .map((option) => option._id)}
              onChange={handleOptionsChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {brands.map((data, i) => {
                return (
                  <MenuItem key={data._id} value={data._id}>
                    {data.brands}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <button
            style={{ display: "flex", marginTop: "20px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Update workout
          </button>
        </div>
      </form>
    </>
  );
}

export default WorkoutUpdateForm;
