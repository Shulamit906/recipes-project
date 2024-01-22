import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import deleteShopping from "../../server/shoppingListServer/deleteShopping";
import editShopping from "../../server/shoppingListServer/editShopping";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import { setShoppingList } from "../../server/shoppingListServer/set ShoppingList";

const DisplayList = () => {

    const user = useSelector(state => state.user)
    const shopping = useSelector(state => state.toShopping)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shopping.length)
            dispatch(setShoppingList(user));
    }, [])
    return (<div className="background-img backgroundPage">
        <table className="soppingList">
            <tbody>
                {shopping?.map((item) => (
                    <tr key={item.Id}>
                        <td className="l">
                            <IconButton onClick={() => dispatch(editShopping(item, user, -1))}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={() => dispatch(editShopping(item, user, 1))}>
                                <AddIcon />
                            </IconButton>
                            <IconButton onClick={() => dispatch(deleteShopping(item))}>
                                <RemoveShoppingCartIcon />
                            </IconButton>
                        </td>
                        <td>{item?.Name}</td>
                        <td>{item?.Count}</td>

                    </tr>
                ))}
            </tbody>
        </table>
    </div>)

}
export default DisplayList;
