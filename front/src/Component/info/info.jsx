import {  useState } from 'react'
import FormInput from '../start/FormInput'
import "../start/profile.css"
import {useNavigate} from "react-router-dom"

const Info = ()=> {
  const navigate=useNavigate();
  const [values, setValues] = useState({
    fullname: "",
    stunumber: "",
    unilocatin: "",
    homelocation: "",
    phonenumber: "",
    username: "",
   
  });


      const inputs = [
        {
            id: 1,
            name: "fullname",
            type: "text",
            placeholder: "full name",
            errorMessage:
              "your name should be 3-16 characters and shouldn't include any special character!r",
            label: "full name",
            pattern: "^[a-z A-z]{3,16}$",
            required: true,
          },
          {
            id: 2,
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
            id: 3,
            name: "unilocatin",
            type: "text",
            placeholder: "uni locatin",
            errorMessage:
              "uni location is empty!",
            label: "uni locatin",
            required: true,
          },
          {
            id: 4,
            name: "homelocation",
            type: "text",
            placeholder: "home location",
            label: "homelocation",
          },
          {
            id: 5,
            name: "phonenumber",
            type: "text",
            placeholder: "phone number",
            errorMessage: "It should be a valid Phone number",
            label: "phone number",
            pattern: "^[0-9]{11}$",
            required: true,
          },
          {
            id: 6,
            name: "username",
            type: "text",
            placeholder: "Username (optional)",
            errorMessage:
              "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Username"
          },
          
      ]

    const handleSubmit = (e) => {
        e.preventDefault();
      };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    return(
        <div className="app" >
      <form onSubmit={handleSubmit}>
        <h1><i className="fa-solid fa-user-gear"></i> your profile </h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Done</button>
        <button onClick={()=>{navigate('/start')}}>Home</button>
      </form>
    </div>
    )
}
export default Info
