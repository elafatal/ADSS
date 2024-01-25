import {  useState } from 'react'
import FormInput from './FormInput'
import "./Profile.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import { useEffect } from 'react'

const Signup = ()=> {
  const navigate=useNavigate();
    const [values, setValues] = useState({
        student_number: "",
        phone_number: "",
        password: "",
        re_password: "",
      });

      const inputs = [
        {
            id: 1,
            name: "student_number",
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
            name: "phone_number",
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
            name: "re_password",
            type: "password",
            placeholder: "تایید رمز عبور",
            errorMessage: "رمزهای عبور مطابقت ندارند",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
          },
      ]
     

    const handleSubmit = async(e) => {
        e.preventDefault();
        navigate('/Start')
       
        const response = await axios.post('http://127.0.0.1:8000/travels/register/',values);

        console.log(response)
      };

      useEffect(() => {
        console.log(values);
       }, [values]);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
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
