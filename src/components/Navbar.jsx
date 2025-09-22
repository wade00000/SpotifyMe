import { NavLink } from "react-router";

function Navbar({handleClick}){
    
    return(
        <div>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Navbar