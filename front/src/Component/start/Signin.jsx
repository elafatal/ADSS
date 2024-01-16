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
          placeholder: "شماره دانشجویی",
          errorMessage:
            "شماره دانشجویی باید یک عدد 11 رقمی باشد",
          label: "stu number",
          pattern: "^[0-9]{11}$",
          required: true,
        },
        {
          id: 2,
          name: "password",
          type: "password",
          placeholder: "رمز عبور",
          errorMessage:
            "رمز عبور شما باید بین 8 تا 20 کاراکتر باشد",
          label: "Password",
          pattern: `^(?=.*[a-z A-Z 0-9 @ # _ ]{8,20}$`,
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
        <h1>ورود</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type='submit'>ورود</button>
        <button onClick={()=>{navigate('/signup')}}>ثبت نام</button>
      </form>
    </div>
    )
}
export default Signin
