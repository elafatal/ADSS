import {  useState } from 'react'
import FormInput from '../start/FormInput'
import "../start/profile.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios' 
import { useEffect } from 'react'

const Newtrips = ()=> {
  const navigate=useNavigate();
  
//   const handlecity = async()=>{
//     const response = await axios.get('https://reqres.in/api/login');
//     console.log(response)
//   }
    const response={
        "data": [
            {
                "name": "Amol",
                "id": 1
            },
            {
                "name": "Babol",
                "id": 2
            },
            {
                "name": "Sari",
                "id": 3
            }
        ]
    }

    const r={
      "data": [
          {
              "name": "falake",
              "id": 1
          },
          {
              "name": "sadaf",
              "id": 3
          }
      ]
  }
  const [values, setValues] = useState({
    cardnumber: "",
    scity: "",
    startinglocatin: "",
    dcity: "",
    destination: "",
    time: "",
  });


      const inputs = [
        {
            id: 1,
            name: "cardnumber",
            type: "text",
            placeholder: "شماره کارت بانکی",
            errorMessage:
              "شماره کارت باید 16 رقم بدون کاراکتر اضافی باشد",
            pattern: "^[0-9]{16}$",
            required: true
          },
          {
            id: 2,
            name: "scity",
            type: "select",
            placeholder: "شهر مبدا",
            errorMessage:
              "شهر مبدا خود را انتخاب نکردید",
            required: true
          },
          {
            id: 3,
            name: "startinglocatin",
            type: "loc",
            placeholder: "مبدا دقیقتان را انتخاب کنید",
            errorMessage:
              "start location is empty",
            required: true,
          },
          {
            id: 4,
            name: "dcity",
            type: "select",
            placeholder: "شهر مقصد",
            errorMessage:
              "this fild is empty",
            required: true
          },
          {
            id: 5,
            name: "destination",
            type: "loc",
            placeholder: "مقصد دقیقتان را انتخاب کنید",
            errorMessage:
              "destination is empty!",
            required: true,
          },
          {
            id: 6,
            name: "time",
            type: "time",
            placeholder: "time",
            errorMessage:
              "time is empty!",
            required: true,
          },
          
         
      ]

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/Home')
      };

      useEffect(() => {
        console.log(values);
       }, [values]);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.name);
        console.log(values);
      };

   
    return(
        <div className="app" >
      <form onSubmit={handleSubmit}>
        <h1><i class="fa-solid fa-car-side"></i> ایجاد سفر جدید </h1>
        {inputs.map((input) => ( (input.type === "select" ) ? <select name={input.name} onChange={onChange} className="formInput">
          <option>{input.placeholder}</option>{response.data.map((s) => <option  value={values[response.data.name]} >{s.name}</option>)}
           </select> : 
        (input.type === "loc" ) ? (<select name={input.name} onChange={onChange} className="formInput">
          <option>{input.placeholder}</option>{r.data.map((sm) => <option value={response.data.name} >{sm.name}</option>)} </select>) : 
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type='submit'  style={{height: '50%' }} >ایجاد سفر</button>
      </form>
    </div>
    )
}
export default Newtrips
