import { NavLink } from "react-router-dom";
import "../App.css"


function Navbar({handleClick}){
    
    return(
        <nav className="nav">
            <div>
                <NavLink to="/app" end>Home</NavLink>
                <NavLink to="/app/popularity">Popularity Rankings</NavLink>
                <NavLink to="/app/top/tracks">Top Tracks</NavLink>
                <NavLink to="/app/top/genres">Top Genres</NavLink>
                <NavLink to="/app/top/artists">Top Artists</NavLink>
            </div>
            <button onClick={handleClick}>Logout</button>
        </nav>
    )
}

export default Navbar