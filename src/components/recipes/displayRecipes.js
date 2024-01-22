import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, FormControl, Input, InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import Select from '@mui/material/Select';

const DisplayRecipes = () => {
    const navig = useNavigate()

    const categories = useSelector(state => state.categories)
    const recipes = useSelector(state => state.recipes)

    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [category, setCategory] = useState('')
    const [level, setLevel] = useState('')
    const [time, setTime] = useState()

    const handleChangeLevel = (event) => {
        setLevel(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
    useEffect(() => {
        setFilteredRecipes(recipes.filter(r => (!category || r.CategoryId == category) && (!time || r.Duration <= time) && (!level || r.Difficulty <= level)))
    }, [category, time, level])
    return <div>
        <div className="filter">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">קטגוריה</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={category}
                    onChange={handleChangeCategory}
                    label="קטגןריה">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categories?.map((category1) => (
                        <MenuItem key={category1.Id} value={category1.Id}>
                            {category1.Name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label"> זמן הכנה</InputLabel>
                <Input type="number" placeholder=" זמן הכנה" onChange={(e) => setTime(e.target.value)} />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">רמת קושי</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={level}
                    onChange={handleChangeLevel}
                    label="רמת קושי">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>קל</MenuItem>
                    <MenuItem value={2}>בינוני</MenuItem>
                    <MenuItem value={3}>קשה</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className="recipes">
            {filteredRecipes?.map((recipe) => (
                <p key={recipe.Id}>
                    <Card sx={{ maxWidth: 345 }} className="cards">
                        <CardMedia className="myImg"
                            component="img"
                            height="140"
                            image={recipe?.Img}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {recipe?.Name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {recipe?.Description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <button className="my-button" onClick={x => navig("/recipeDetailes", { state: { recipe } })}>
                                לפרטי המתכון
                            </button>
                        </CardActions>
                    </Card>
                </p>
            ))}
        </div>
    </div>

}
export default DisplayRecipes