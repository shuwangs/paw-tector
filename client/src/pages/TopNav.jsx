// import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";


const TopNav = () => {
    return(
        <Navbar className="top-nav">
            <Navbar.Brand className="brand" href="/"> 🐾 Paw-tector</Navbar.Brand>
            
            <Nav>
                <NavLink to='/' className ='nav-link' > Home</NavLink>
                <NavLink to='/discover' className ='nav-link' > Discover</NavLink>
                <NavLink to='/myrecords' className = 'nav-link'>My Records</NavLink>
            </Nav>

        </Navbar>       
    )
}

export default TopNav;