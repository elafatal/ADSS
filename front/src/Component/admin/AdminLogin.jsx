import {  useState } from 'react'
import FormInput from '../start/FormInput'
import "../start/profile.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import { useEffect } from 'react'
import Cookies from 'universal-cookie';






const AdminLogin = ()=> {
  

  let message=false
  const navigate=useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
      });

      const inputs = [
        {
          id: 1,
          name: "username",
          type: "text",
          placeholder: "نام کاربری",
          errorMessage:
            "نام کاربری نمیتواند یک فیلد خالی باشد",
          label: "stu number",
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
          required: true,
        },
      ]

      const handleSubmit =async (e) => {
        e.preventDefault();

        let response = await axios.post('http://127.0.0.1:8000/travels/login/',values);
       
        if (response.data.status != "fail") {
          navigate('/admin')
        }
        const cookies = new Cookies();
        cookies.set('access_token', response.data.access_token);

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
       
        
      </form>
    </div></>
      
      
    )
}
export default AdminLogin