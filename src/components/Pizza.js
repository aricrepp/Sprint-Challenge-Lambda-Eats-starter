import React, {useState,useEffect} from "react";
import * as yup from 'yup';
import axios from 'axios';
import OrderSubmit from "./OrderSubmit.js";
import Modal from "react-modal";
import "./Pizza.css";

const Pizza = props => {

    const formSchema = yup.object().shape({
        size: yup.string().required("Must choose a size"),
        sauce: yup.string().required("Must choose a sauce"),
        instructions: yup.string()
        // email: yup
        //   .string()
        //   .email("Must be a valid email address")
        //   .test('email-taken', 'Email is taken', value => value !== "waffle@syrup.com")
        //   .required("Must include email address"),
        // password: yup.string()
        //   // .when('$user', (user, passSchema) => user ? passSchema : passSchema.min(6, 'minimal password length is 6 characters'))
        //   // .when('$user', (user, passSchema) => user ? passSchema : passSchema.max(15, 'maximum password length is 15 characters')
        //   .matches(
    
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        //     `Must Contain 8 Characters One Uppercase, One Lowercase, One Number and One Special Case Character`,
        //   )
        //   .required(),
        
        // terms: yup.boolean().oneOf([true], "Please agree to terms of use")
      });

    const [formState, setFormState] = useState({
        // name: "",
        // email: "",
        // password: "",
        // size: "",
        // terms: false
        size: "",
        sauce: "",
        instructions: ""
      });
    
      // BONUS!: state for whether our button should be disabled or not.
      const [buttonDisabled, setButtonDisabled] = useState(true);
      const [user, setUser] = useState([]);
      // Everytime formState changes, check to see if it passes verification.
      // If it does, then enable the submit button, otherwise disable
      useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [formState]);
  
      
    
      const [errorState, setErrorState] = useState({
        size: "",
        sauce: "",
        instructions: ""
      });
    
      const validate = e => {
        let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
          .reach(formSchema, e.target.name)
          .validate(value)
          .then(valid => {
            setErrorState({
              ...errorState,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrorState({
              ...errorState,
              [e.target.name]: err.errors[0]
            });
          });
      };
    
      // onChange function
      const inputChange = e => {
        console.log("input changed!", e.target.value, e.target.checked);
        e.persist();
        
        validate(e);
        let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
      };
    
      const formSubmit = e => {
        e.preventDefault();
        console.log("form submitted!");
        axios
          .post("https://reqres.in/api/users", formState)
          .then(response => {
              setUser([...user, response.data]);
              setFormState({
                size: "",
                sauce: "",
                instructions: ""
                });
          })
          .catch(err => console.log(err));
      };

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          background            : '#bbb',
          padding               : '0'
        }
      };


    return(

        <div >
        
        <Modal
          isOpen={props.modalIsOpen}
          onAfterOpen={props.afterOpenModal}
          onRequestClose={props.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          parentSelector={() => document.querySelector('#root')}>
            
            <button className="modalButton" onClick={props.closeModal}>X</button>
          <h2 >Build Your Own Pizza</h2>
  
          <form onSubmit={formSubmit}>
          <label htmlFor="sizes">Choice of Size</label>
            <select
                value={formState.size}
                name="size"
                id="sizes"
                onChange={inputChange}
                >
                <option value="Blank"></option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                </select>
                {errorState.size.length > 0 ? (
                <p className="error">{errorState.size}</p>
                ) : null}
            <label htmlFor="sauces"> Sauces</label>
            <select
                value={formState.sauce}
                name="sauce"
                id="sauces"
                onChange={inputChange}
                >
                <option value="Blank"></option>
                <option value="Marinara">Marinara</option>
                <option value="Pesto">Pesto</option>
                <option value="BBQ">BBQ</option>
                </select>
                {errorState.sauce.length > 0 ? (
                <p className="error">{errorState.sauce}</p>
                ) : null}
            
            <label htmlFor="extra">
            Anything Else?
            
            {errorState.instructions.length > 0 ? (
                <p className="error">{errorState.instructions}</p>
            ) : null}
            </label>
            <textarea
                className="instructions"
                name="instructions"
                id="extra"
                type='instructions'
                value={formState.instructions}
                onChange={inputChange}
            /> 

            <button className="submit" disabled={buttonDisabled}>Add to Order</button>
            
            
        </form>
          

        <OrderSubmit user={user} />
        </Modal>
      </div>
        
    );
}

export default Pizza;