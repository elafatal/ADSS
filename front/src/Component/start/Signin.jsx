import {  useState } from 'react'
import FormInput from './FormInput'
import "./Profile.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import { useEffect } from 'react'
import Cookies from 'universal-cookie';
import Alert from '@mui/material/Alert';





const Signin = ()=> {
  

  let message=false
  const navigate=useNavigate();
    const [values, setValues] = useState({
        student_number: "",
        password: "",
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
          name: "password",
          type: "password",
          placeholder: "رمز عبور",
          errorMessage:
            "رمز عبور شما باید بین 8 تا 20 کاراکتر باشد",
          label: "Password",
          pattern: "^(?=.*[a-z A-Z 0-9 @ # _ ]{8,20}$",
          required: true,
        },
      ]

      const handleSubmit =async (e) => {
        e.preventDefault();

        let response = await axios.post('http://127.0.0.1:8000/travels/login/',values);
        alert("Your message here");
        if (response.data.status != "fail") {
          navigate('/Start')
          setTimeout(() => {
            navigate('/Start')
        }, 3000); // Delay of 3 seconds
        }
        const cookies = new Cookies();
        cookies.set('access_token', response.data.access_token);
        console.log(cookies.get('access_token'));

        response = await axios.get('http://127.0.0.1:8000/travels/user/',{
  headers: {
    Authorization: `Bearer ${cookies.get("access_token")}`
  }


});
        console.log(response)
      };
      
      useEffect(() => {
        console.log(values);
       }, [values]);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
       

      };

    return(
      <>
       {/* <Alert style={{marginTop: "30px" , marginBottom : "0px"}} variant="outlined" severity="success">
          This is an outlined success Alert.
       </Alert> */}

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
    </div></>
      
      
    )
}
export default Signin