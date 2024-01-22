import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import deleteRecipe from "../../server/recipeServer/deleteRecipe";
import editShopping from "../../server/shoppingListServer/editShopping";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const RecipeDetailes = () => {
    const user = useSelector(state => state.user)
    const { state: { recipe } } = useLocation();
    const navig = useNavigate()
    const dispatch = useDispatch()
    return <div className="background-img backgroundPage detailes">
        <div className="recipe">
            <Card className="cardDetailes" sx={{ maxWidth: 345 }} >
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
                        <h4> דרגת קושי :{recipe?.Difficulty}</h4>
                        <h4> משך זמן : {recipe?.Duration}</h4>
                        <div>
                            {recipe.Ingrident?.map((i) => (
                                <h4>  {i?.Name}: {i?.Count} {i?.Type}
                                    <IconButton onClick={() => dispatch(editShopping(i, user, 1))}>
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                </h4>
                            ))}
                        </div>
                        <div>
                            <h5 >: אופן ההכנה </h5>
                            {recipe?.Instructions?.map((i) => (
                                <p> {i}</p>
                            ))}

                        </div>
                    </Typography>
                </CardContent>
                <button className="my-button" onClick={x => window.print()}>הדפסה</button>
                {recipe.UserId == user.Id && (
                    <>
                        <button className="my-button" onClick={() => navig("/editRecipe", { state: { recipe } })} >עריכה </button>
                        <button className="my-button" onClick={() => dispatch(deleteRecipe(recipe, navig))}>מחיקה </button>

                    </>
                )}
            </Card>
        </div></div>

}
export default RecipeDetailes