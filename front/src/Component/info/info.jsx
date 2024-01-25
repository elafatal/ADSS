import {  useState } from 'react'
import FormInput from '../start/FormInput'
import "../start/profile.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios'

const Info = ()=> {
  const navigate=useNavigate();
  const [values, setValues] = useState({
    fullname: "",
    stunumber: "",
    unilocatin: "",
    homelocation: "",
    phonenumber: ""
  });


      const inputs = [
        {
            id: 1,
            name: "fullname",
            type: "text",
            placeholder: "نام   ",
            errorMessage:
              "اسم شما باید بین 3 تا 16 حرف باشد و شامل کاراکترهای خاص نباشد",
            label: "full name",
            pattern: "^[a-z A-z]{3,16}$",
            required: true,
          },
          {
            id: 2,
            name: "fullname",
            type: "text",
            placeholder: "نام خانوادگی",
            errorMessage:
              "اسم شما باید بین 3 تا 16 حرف باشد و شامل کاراکترهای خاص نباشد",
            label: "full name",
            pattern: "^[a-z A-z]{3,16}$",
            required: true,
          },
          
          {
            id: 3,
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
            id: 4,
            name: "phonenumber",
            type: "text",
            placeholder: "شماره موبایل",
            errorMessage: "شماره تماس شما باید با 09 شروع شود ",
            label: "phone number",
            pattern: "^[0-9]{11}$",
            required: true,
          }
          
      ]

    const handleSubmit =async (e) => {
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:8000/travels/login/',values);
        if (response.data.status != "fail") {
          navigate('/Start')
        }
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
