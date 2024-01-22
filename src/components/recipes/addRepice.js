import { useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import addNewRecipes from "../../server/recipeServer/addNewRecipe"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import editRecipe from "../../server/recipeServer/editRecipe";
import * as React from 'react';
import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const schema = yup
  .object({
    Name: yup.string().required("שדה חובה"),
    CategoryId: yup.number().required("שדה חובה"),
    Img: yup.string().required("שדה חובה"),
    Duration: yup.string().required("שדה חובה"),
    Difficulty: yup.number().positive().required("שדה חובה"),
    Description: yup.string().required("שדה חובה"),
    Ingrident: yup.array().of(
      yup.object().shape({
        Name: yup.string().required("שדה חובה"),
        Count: yup.string().required("שדה חובה"),
        Type: yup.string().required("שדה חובה"),
      })
    ),
    Instructions: yup.array().of(yup.string().required("שדה חובה")),
  })
  .required()

const AddRecipes = () => {
  const { state } = useLocation();
  const recipe = state?.recipe;
  const user = useSelector(state => state.user)
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()
  const navig = useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors }, control
  } = useForm({
    resolver: yupResolver(schema),
    values: recipe,
  })
  const onSubmit = (data) => {

    console.log("i am here")
    data["UserId"] = user.Id;
    if (state)
      dispatch(editRecipe(data, navig))
    else
      dispatch(addNewRecipes(data, navig))
  }
  const { fields: fieldsIngrident, append: appendIngrident, remove: removeIngrident, } = useFieldArray({
    control,
    name: "Ingrident",
  });
  const { fields: fieldsInstructions, append: appendInstructions, remove: removevInstructions, } = useFieldArray({
    control,
    name: "Instructions",
  });
  return (<div className="background-img backgroundPage addRecipe">
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> שם </InputLabel>
        <Input {...register("Name")} />
        <p>{errors.Name?.message}</p>
      </FormControl>
      <br />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 185 }}>
        <InputLabel id="demo-simple-select-standard-label">קטגוריה</InputLabel>
        <Select
          {...register("CategoryId")}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="קטגוריה">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories?.map((category) => (
            <MenuItem key={category.Id} value={category.Id}>
              <p> {category?.Name}</p>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> תמונה </InputLabel>
        <Input {...register("Img")} />
        <p>{errors.Img?.message}</p>
      </FormControl>
      <br />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-input-standard-label"> זמן הכנה</InputLabel>
        <Input {...register("Duration")} type="number" />
      </FormControl>
      <br />


      <FormControl variant="standard" sx={{ m: 1, minWidth: 185 }}>
        <InputLabel id="demo-simple-select-standard-label">רמת קושי</InputLabel>
        <Select {...register("Difficulty")}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="רמת קושי">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>קל</MenuItem>
          <MenuItem value={2}>בינוני</MenuItem>
          <MenuItem value={3}>קשה</MenuItem>
        </Select>
      </FormControl>
      <br />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label">תיאור</InputLabel>
        <Input {...register("Description")} />
        <p>{errors.Description?.message}</p>
      </FormControl>
      <br />

      {fieldsIngrident.map((field, index) => (
        <>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
            <InputLabel id="demo-simple-input-standard-label"> סוג  </InputLabel>
            <Input {...register(`Ingrident.${index}.Type`)} />
            <p>{errors.Ingrident?.[index]?.c?.message}</p>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
            <InputLabel id="demo-simple-input-standard-label"> כמות  </InputLabel>
            <Input {...register(`Ingrident.${index}.Count`)} />
            <p>{errors.Ingrident?.[index]?.b?.message}</p>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
            <InputLabel id="demo-simple-input-standard-label">שם מוצר </InputLabel>
            <Input {...register(`Ingrident.${index}.Name`)} />
            <p>{errors.Ingrident?.[index]?.a?.message}</p>
          </FormControl>


          <IconButton onClick={() => removeIngrident(index)}>
            <DeleteForeverIcon />
          </IconButton>
          <br />

        </>
      ))}
      <br />

      {fieldsInstructions.map((field, index) => (
        <>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
            <InputLabel id="demo-simple-input-standard-label"> הוראה  </InputLabel>
            <Input {...register(`Instructions.${index}`)} />
            <p>{errors.Instructions?.[index]?.a?.message}</p>
          </FormControl>



          <IconButton onClick={() => removevInstructions(index)}>
            <DeleteForeverIcon />
          </IconButton>
          <br />

        </>
      ))}
      <br />
      <button className="my-button" onClick={() => appendIngrident({})}> הוסף מוצר</button>

      <button className="my-button" onClick={() => appendInstructions('')}> הוסף הוראה</button>
      <br />
      <Input type="submit" className="my-button" />
    </form>
  </div>
  )
}
export default AddRecipes;

