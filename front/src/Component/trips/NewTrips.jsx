import {  useState } from 'react'
import FormInput from '../start/FormInput'
import "../start/profile.css"
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import { useEffect } from 'react'

const Newtrips = ()=> {
  const navigate = useNavigate();
  const [loc, setLoc] = useState([]);
  const [is_driver , setIs_driver] = useState(0);


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
            name: "scity",
            type: "select",
            placeholder: "شهر مبدا",
            errorMessage:
              "شهر مبدا خود را انتخاب نکردید",
            required: true
          },
          {
            id: 2,
            name: "startinglocatin",
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
            name: "destination",
            type: "loc",
            placeholder: "مقصد دقیقتان را انتخاب کنید",
            errorMessage:
              "destination is empty!",
            required: true,
          },
          {
            id: 5,
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
        navigate('/Start')
        setIs_driver(1)
      };

      useEffect(() => {
        console.log(values);
       }, [values]);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.name);
        console.log(values);
      };


      const getloc = async(e) => {
        
        const selectedCityId = e.target.value;
        const tok = { "city_id" : selectedCityId}
        const response = await axios.get('http://127.0.0.1:8000/travels/city_locations/',tok);
        console.log(response);
       }


    return(

        <div className="app" >

      <form onSubmit={handleSubmit}>
        <h1><i className="fa-solid fa-car-side"></i> ایجاد سفر جدید </h1>


        {inputs.map((input) => ( (input.type === "select" ) ? <select name={input.name} onChange={getloc} className="formInput">
          <option>{input.placeholder}</option>{loc.map((s) => <option  value={s.id} >{s.name}</option>)}

           </select> :
        (input.type === "loc" ) ? (<select name={input.name} onChange={onChange} className="formInput">
          <option>{input.placeholder}</option>{r.data.map((sm) => <option value={loc.name} >{sm.name}</option>)} </select>) :
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