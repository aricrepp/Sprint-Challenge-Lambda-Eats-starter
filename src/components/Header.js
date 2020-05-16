import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";

const Header = props => {
    return(

        <div className="headerImg">
           <div className="headerContent"> 
                <h2>Your favorite food, delivered while coding</h2>
                <Link to={'/order'}>
                    <div className="pizzaButton"><p>Pizza?</p></div>
                </Link>
                
            </div> 
        </div>
        
    );
}

export default Header;