import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { addNewUser } from '../../server/userServer/userService'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import * as React from 'react';
import { FormControl, Input, InputLabel } from '@mui/material';



const schema = yup
  .object({
    Username: yup.string().required(),
    Password: yup.string().required(),
    Name: yup.string().required(),
    Phone: yup.number().positive().integer().required(),
    Email: yup.string().email(),
    Tz: yup.number().positive().integer()
  })
  .required()


const Sighin = () => {

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    dispatch(addNewUser(data))
  }


  return (<div className="background-img backgroundPage">
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> שם משתמש </InputLabel>
        <Input {...register("Username")} />
        <p>{errors.Username?.message}</p>
      </FormControl>
      <br />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> סיסמא </InputLabel>
        <Input {...register("Password")} />
        <p>{errors.Password?.message}</p>
      </FormControl>
      <br />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> שם </InputLabel>
        <Input {...register("Name")} />
        <p>{errors.Name?.message}</p>
      </FormControl>
      <br />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> טלפון </InputLabel>
        <Input {...register("Phone")} />
        <p>{errors.Phone?.message}</p>
      </FormControl>
      <br />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> מייל </InputLabel>
        <Input {...register("Email")} />
        <p>{errors.Email?.message}</p>
      </FormControl>
      <br />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
        <InputLabel id="demo-simple-input-standard-label"> תעודת זהות </InputLabel>
        <Input {...register("Tz")} />
        <p>{errors.Tz?.message}</p>
      </FormControl>
      <br />

      <input type="submit" className="my-button" />
      <br />

      <Link to={'/Login'}>Do you have an account yet?  login now</Link>
    </form>
  </div>
  )
}
export default Sighin;