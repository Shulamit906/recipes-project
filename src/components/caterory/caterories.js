import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import addCategory from "../../server/categoryServer/addCategory";
import { FormControl, Input, InputLabel } from "@mui/material";

const schema = yup
    .object({
        Name: yup.string().required(),
    })
    .required()

const Caterories = () => {
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        dispatch(addCategory(data))
    }

    return (<div className="categories background-img backgroundPage">
        <div>
            {categories?.map((category) => (
                <h4 key={category.Id}>
                    {category?.Name}
                </h4>
            ))}
        </div>
        <div className="ll">
            <form onSubmit={handleSubmit(onSubmit)} >

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="demo-simple-input-standard-label"> הוסף קטגוריה </InputLabel>
                    <Input {...register("Name")} />
                    <p>{errors.Name?.message}</p>
                </FormControl>
                <br />
                <input type="submit" className="my-button" />
            </form>
        </div>
    </div>)
}
export default Caterories;