import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Header = () => {

    const dispatch = useDispatch()
    const signout = () => {
        dispatch({ type: 'SET_USER', payload: null })
        dispatch({ type: 'SET_TOSHOPPING', payload: [] })
    }

    const user = useSelector(state => state.user)
    if (!user)
        return <div className="header login2">
            <div className="App-header">
                <Link to="/login">כניסה</Link>
                <div>|</div>
                <Link to="/sighin">הרשמה</Link>
            </div>
            <div className='my-img'></div>

        </div>
    else return <div className='header'>
        <div className="App-header">
            <Link to="/homePage">דף הבית </Link>
            <div>|</div>
            <Link to="/recipes">מתכונים</Link>
            <div>|</div>
            <Link to="/myRecipes">המתכונים שלי</Link>
            <div>|</div>
            <Link to="/addRecipe">הוסף מתכון</Link>
            <div>|</div>
            <Link to="/categories">קטגוריות</Link>
            <div>|</div>
            <Link to="/displayList">הקניות שלי</Link>

        </div>

        <div className="App-header">
            <Link to="/" onClick={() => signout()}>
                <div className='user'>
                    <div> {user.Name}<PersonOutlineIcon /></div>
                    <div>החלף משתמש</div>
                </div> </Link>
            <div className='my-img'></div>
        </div>

    </div>
}
export default Header;