import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import loginUser from "../../server/userServer/loginUserService"
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import * as React from 'react';
import { FormControl, Input, InputLabel } from '@mui/material';



const schema = yup
  .object({
    Username: yup.string().required(),
    Password: yup.string().required(),
  })
  .required()

const Login = () => {

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {

    dispatch(loginUser(data))
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
        <Input type="password" {...register("Password")} />
        <p>{errors.Password?.message}</p>
      </FormControl>
      <br />
      <input type="submit" className="my-button" />
      <br />
      <Link to={'/Sighin'}>Don't have an account yet? Sign in now</Link>
    </form>
  </div>
  )
}
export default Login;