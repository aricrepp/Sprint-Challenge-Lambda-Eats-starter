import React, {useState} from "react";
import {Link} from "react-router-dom";
import Pizza from "./Pizza.js";
import "./Header.css";

const Header = props => {

    var subtitle;
  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }
 
  function closeModal(){
    setIsOpen(false);
  }
    
    
    return(
        <div className="headerImg">
           <div className="headerContent"> 
                <h2>Your favorite food, delivered while coding</h2>
                <button onClick={openModal} className="pizzaButton"><p>Pizza?</p></button>
                <Pizza closeModal={closeModal} afterOpenModal={afterOpenModal} openModal={openModal} modalIsOpen={modalIsOpen}/>
            </div> 
        </div>
        
    );
}

export default Header;