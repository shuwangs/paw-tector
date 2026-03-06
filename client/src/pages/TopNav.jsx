// import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import '../App.css';

const TopNav = () => {
    return(
        <Navbar className="top-nav">
            <Navbar.Brand className="brand" as={Link} to="/"> 🐾 Paw-tector</Navbar.Brand>
            
            <Nav className='nav-link-ctn'>
                <NavLink to='/' className ='nav-link' > Home</NavLink>
                <NavLink to='/discover' className ='nav-link' >Discover</NavLink>
                <NavLink to='/records' className = 'nav-link'>My Records</NavLink>
            </Nav>

        </Navbar>       
    )
}

export default TopNav;