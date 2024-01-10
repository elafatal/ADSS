import {  useState } from 'react'
import FormInput from './FormInput'
import "./Profile.css"
import {useNavigate} from "react-router-dom"

const Signin = ()=> {
  const navigate=useNavigate();
    const [values, setValues] = useState({
        stunumber: "",
        password: "",
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
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
              "Password should be 8-20 characters.",
            label: "Password",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            pattern: "^[0-9]{11}$",
            required: true,
          }
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
        <h1>login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type='submit'>Login</button>
        <button onClick={()=>{navigate('/signup')}}>Sign up</button>
      </form>
    </div>
    )
}
export default Signin
