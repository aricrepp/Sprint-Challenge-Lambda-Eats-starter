import React from "react";
import {Route} from "react-router-dom";
import Modal from "react-modal";
import Nav from "./components/Nav.js";
import Header from "./components/Header.js";
import FoodList from "./components/FoodList.js";

const App = () => {

  return (
    <Route exact path="/">
      <Nav />
      <Header />
      <FoodList /> 
    </Route>
    
  );
};
export default App;
