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
            placeholder: "نام و نام خانوادگی",
            errorMessage:
              "اسم شما باید بین 3 تا 16 حرف باشد و شامل کاراکترهای خاص نباشد",
            label: "full name",
            pattern: "^[a-z A-z]{3,16}$",
            required: true,
          },
          {
            id: 2,
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
            id: 3,
            name: "phonenumber",
            type: "text",
            placeholder: "شماره موبایل",
            errorMessage: "شماره تماس شما باید با 09 شروع شود ",
            label: "phone number",
            pattern: "^[0-9]{11}$",
            required: true,
          },
          {
            id: 4,
            name: "username",
            type: "text",
            placeholder: "نام کاربری (اختیاری)",
            errorMessage:
              "این نام کاربری قبلاً گرفته شده است",
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
        <h1><i className="fa-solid fa-user-gear"></i> مشخصات شما </h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>ثبت</button>
        <button onClick={()=>{navigate('/start')}}>بازگشت </button>
      </form>
    </div>
    )
}
export default Info
