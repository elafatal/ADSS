import {  useState } from 'react'
import FormInput from '../start/FormInput'
import "../start/profile.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import { useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Cookies from 'universal-cookie';

const Newtrips = ()=> {
  const navigate = useNavigate();
  const [loc, setLoc] = useState([]);
  const [locc, setlocc] = useState([]);
  const [locc1, setlocc1] = useState([]);
  


  const handlecity = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/travels/all_cities/');
      let data = [...loc]
        data = response.data.data
      setLoc(data);

    } catch (error) {
      console.error('Error fetching cities:', error);

    }
  };
   useEffect(() => {
    handlecity();
    console.log(loc);
  }, []); 


  const [values, setValues] = useState({
    is_driver: "0",
    origin_id: "",
    destination_id: ""
    // time : "",
    // date : ""
  });


      const inputs = [
          {
            id: 1,
            name: "is_driver",
            type: "select",
            placeholder: "شهر مبدا",
            errorMessage:
              "شهر مبدا خود را انتخاب نکردید",
            required: true
          },
          {
            id: 2,
            name: "origin_id",
            type: "loc",
            placeholder: "مبدا دقیقتان را انتخاب کنید",
            errorMessage:
              "start location is empty",
            required: true,
          },
          {
            id: 3,
            name: "dcity",
            type: "select",
            placeholder: "شهر مقصد",
            errorMessage:
              "this fild is empty",
            required: true
          },
          {
            id: 4,
            name: "destination_id",
            type: "loc",
            placeholder: "مقصد دقیقتان را انتخاب کنید",
            errorMessage:
              "destination is empty!",
            required: true,
          }
          // {
          //   id: 5,
          //   name: "time",
          //   type: "time",
          //   placeholder: "time",
          //   errorMessage:
          //     "time is empty!",
          //   required: true,
          // },
          // {
          //   id: 6,
          //   name: "date",
          //   type: "date",
          //   placeholder: "time",
          //   errorMessage:
          //     "time is empty!",
          //   required: true,
          // },


      ]

    const handleSubmit =async(e) => {
        e.preventDefault();
        const cookies = new Cookies();
        const response = await axios.post('http://127.0.0.1:8000/travels/create/', values, {
          headers: {
            Authorization: `Bearer ${ cookies.get("access_token")}`
          }} );
        alert("سفر شما ساخته شد");
        if (response.data.status === "success") {
          setTimeout(() => {
            navigate('/Start')
        }, 3000); 
        }
       
        console.log(response);
        
      };

      useEffect(() => {
        console.log(values);
       }, [values]);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.name);
        console.log(values);
      };




      useEffect(() => {
        
        console.log(locc1);
      }, []);

      const getloc = async(event,num) => {
        console.log(event);
        const selectedCityId = event.target.value;
        const tok = { "city_id": selectedCityId };
        const response = await axios.get('http://127.0.0.1:8000/travels/city_locations/', { params: tok });
        
        if (num === 1) {
          console.log(event.target.value);
          let data1 = [...locc]
        data1 = response.data.data
        setlocc(data1);
        
        }
        if (num === 3) {
          let data2 = [...locc1]
          console.log(event.target.value);
          data2 = response.data.data
          setlocc1(data2);
          
        }
        
        
       } 
       


    return(
      
        <div className="app" >

      <form onSubmit={handleSubmit}>
        <h1><i className="fa-solid fa-car-side"></i> ایجاد سفر جدید </h1>



        {inputs.map((input) => ( (input.type === "select" ) ? <select name={input.name} onChange={(event)=>getloc(event,input.id)} className="formInput">

          <option>{input.placeholder}</option>{loc.map((s) => <option  value={s.id} >{s.name}</option>)}

           </select> :
        (input.type === "loc" && input.id===2 ) ? (<select name={input.name} onChange={onChange} className="formInput">
          <option>{input.placeholder}</option>{locc.map((sm) => <option value={sm.id} >{sm.name}</option>)} </select>) :
          (input.type === "loc" && input.id===4 ) ? (<select name={input.name} onChange={onChange} className="formInput">
          <option>{input.placeholder}</option>{locc1.map((sm) => <option value={sm.id} >{sm.name}</option>)} </select>):
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