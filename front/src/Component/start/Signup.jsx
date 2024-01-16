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
            placeholder: "شماره دانشجویی",
            errorMessage:
              "شماره دانشجویی باید یک عدد 11 رقمی باشد",
            label: "stu number",
            pattern: "^[0-9]{11}$",
            required: true,
          },
          {
            id: 2,
            name: "phonenumber",
            type: "text",
            placeholder: "شماره موبایل",
            errorMessage: "شماره تماس شما باید با 09 شروع شود ",
            label: "phone number",
            pattern: "^[0-9]{11}$",
            required: true,
          },
          {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "رمز عبور",
            errorMessage:
              "رمز عبور شما باید بین 8 تا 20 کاراکتر باشد",
            label: "Password",
            pattern: `^(?=.*[a-z A-Z 0-9 @ #]{8,20}$`,
            required: true,
          },
          {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "تایید رمز عبور",
            errorMessage: "رمزهای عبور مطابقت ندارند",
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
        <h1>ایجاد حساب کاربری</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type='submit'>ثبت نام</button>
        <button onClick={()=>{navigate('/signin')}}>ورود</button>
      </form>
    </div>
    )
}
export default Signup
