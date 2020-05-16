import React from "react";
import {Link} from "react-router-dom";
import "./Nav.css";

const Nav = props => {
    return(

        <nav >
            <h1>Lambda Eats</h1>
            <div className="navButtonCon">
                <Link className="navButton" tp={'/'}>
                    <div ><p>Home</p></div>
                </Link>
                <Link className="navButton">
                    <div ><p>Help</p></div>
                </Link>
                
            </div>
        </nav>
    );
}

export default Nav;