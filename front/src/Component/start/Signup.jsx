import {  useState } from 'react'
import FormInput from './FormInput'
import "./Profile.css"
import {useNavigate} from "react-router-dom"

const Signup = ()=> {
  const navigate=useNavigate();
    const [values, setValues] = useState({
        stunumber: "",
        phonenumber: "",
        password: "",
        confirmPassword: "",
      });

      const inputs = [
        {
            id: 1,
            name: "stunumber",
            type: "text",
            placeholder: "stu number",
            errorMessage:
              "stu number should be a number",
            label: "stu number",
            pattern: "^[0-9]{11}$",
            required: true,
          },
          {
            id: 2,
            name: "phonenumber",
            type: "text",
            placeholder: "phone number",
            errorMessage: "It should be a valid Phone number",
            label: "phone number",
            pattern: "^[0-9]{11}$",
            required: true,
          },
          {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
              "Password should be 8-20 characters.",
            label: "Password",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            pattern: "^[0-9]{11}$",
            required: true,
          },
          {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match!",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
          },
      ]

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/')
      };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    return(
        <div className="app" >
      <form onSubmit={handleSubmit}>
        <h1>create account</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type='submit'>Sign up</button>
        <button onClick={()=>{navigate('/signin')}}>login</button>
      </form>
    </div>
    )
}
export default Signup
