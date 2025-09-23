import { NavLink } from "react-router-dom";
import "../App.css"


function Navbar({handleClick}){
    
    return(
        <nav>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/popularity">Popularity Rankings</NavLink>
                <NavLink to="/top/tracks">Top Tracks</NavLink>
                <NavLink to="/top/genres">Top Genres</NavLink>
                <NavLink to="/top/artists">Top Artists</NavLink>
            </div>
            <button onClick={handleClick}>Logout</button>
        </nav>
    )
}

export default Navbar