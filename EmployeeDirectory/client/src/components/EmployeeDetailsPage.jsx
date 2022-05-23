import axios from "axios";
import { useState, useEffect } from "react";
import EmployeeList from "./EmployeeList";
import { useLocation } from "react-router-dom";
export default function EmployeeDetailsPage(props) {
  const [data, setData] = useState();
  const [formVisible,setFormVisible] = useState(false)

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [titleId, setTitleId] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [deptIdMap,setDeptIdMap] = useState({})
  const [titleIdMap,setTitleIdMap] = useState({})
  const [locationIdMap,setLocationIdMap] = useState({})
  const [titleList, setTitleList] = useState([]);
  const [dataReady,setDataReady] = useState(false)

  const locationData = useLocation();
  let idVal =''
  if(locationData.state)
  {
    const { id } = locationData.state;
    idVal = id
  }
  else{
    const id  = ''
  }

  
  const getEmployee = (id) => {
    axios.get("http://localhost:3005/employees/" + id).then((resp) => {
      console.log("data", resp.data[0]);
      setFirstName(resp.data[0].first_name)
      setMiddleName(resp.data[0].middle_name)
      setLastName(resp.data[0].last_name)
      setData(resp.data);
    });
  };

  const updateEmployee =(id)=>{
    axios.put("http://localhost:3005/employees",{
      employeeId:id,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
    }).then((resp) => {
      console.log("data", resp.data);
      setData(resp.data);
    });
  }
  useEffect(() => {
    if(!localStorage.getItem("emp_id") || idVal)
      localStorage.setItem("emp_id",idVal)
    console.log(localStorage.getItem('emp_id'),idVal)
    getEmployee(localStorage.getItem("emp_id"));
  }, []);
  return (
    <div style={styles.container}>

      {data ? (
        <div style={styles.detailsView}>
          <button style={styles.button} onClick={()=>{
            formVisible ? setFormVisible(false) : setFormVisible(true)
          }}>Edit</button>
          
           {formVisible ? (<form onSubmit={updateEmployee(localStorage.getItem('emp_id'))}>
          <label style={styles.label}>First Name:</label>
          <input
            type='text'
            name='first_name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.textField}
          />
          <label style={styles.label}>Middle Name:</label>
          <input
            type='text'
            name='middle_name'
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            style={styles.textField}
          />
          <label style={styles.label}>Last Name:</label>
          <input
            type='text'
            name='last_name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={styles.textField}
          />
          <label style={styles.label}>Department:</label>
          <input
            list='departmentList'
            onChange={(e) => setDepartmentId(deptIdMap[e.target.value])}
            style={styles.textField}
            value={data[0].department}
          />
          <datalist id='departmentList' style={styles.nameDropDown}>
            {departmentList.length > 0
              ? departmentList.map((val) => (
                  <option key={val.id}>{val.name}</option>
                ))
              : true}
          </datalist>
          <label style={styles.label}>Title:</label>
          <input
            
            list='titleList'
            onChange={(e) => setTitleId(titleIdMap[e.target.value])}
            style={styles.textField}
            value={data[0].title}
          />
          <datalist id='titleList' style={styles.nameDropDown}>
            {titleList.length > 0
              ? titleList.map((val) => <option key={val.id}>{val.title}</option>)
              : true}
          </datalist>
          <label style={styles.label}>Location:</label>
          <input
            list='locationList'
            onChange={(e) => setLocationId(locationIdMap[e.target.value])}
            style={styles.textField}
            value={data[0].location}
          />
          <datalist id='locationList' style={styles.nameDropDown}>
            {locationList.length > 0
              ? locationList.map((val) => <option key={val.id}>{val.city}</option>)
              : true}
          </datalist>

          <input style={styles.submitButton} type='submit' value='Update' />
        </form>) :(<div></div>)}


        {!formVisible ?
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.label}>First Name</td>
                <td>:</td>
                <td style={styles.data}>{data[0].first_name}</td>
              </tr>
              <tr>
                <td style={styles.label}>Middle Name</td>
                <td>:</td>
                <td  style={styles.data}>{data[0].middle_name}</td>
              </tr>
              <tr>
                <td style={styles.label}>Last Name</td>
                <td>:</td>
                <td style={styles.data}>{data[0].last_name}</td>
              </tr>
              <tr>
                <td style={styles.label}>Department</td>
                <td>:</td>
                <td style={styles.data}>{data[0].department}</td>
              </tr>
              <tr>
                <td style={styles.label}>Title</td>
                <td>:</td>
                <td style={styles.data}>{data[0].title}</td>
              </tr>
              <tr>
                <td style={styles.label}>Location</td>
                <td>:</td>
                <td style={styles.data}>{data[0].location}</td>
              </tr>
            </tbody>
          </table> : <div></div>}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "inline-block",
    verticalAlign: "top",
    padding: "3vw",
  },
  button: {
    padding: "1vw",
    width:'10vw'
  },
  detailsView: {
    display: "inline-block",
    flexWrap: "wrap",
    width: "15vw",
    padding: "2vh",
  },
  label: {
    fontWeight: "bold",
    backgroundColor:'',
    textAlign:'right'
  },
  table:{
    borderSpacing: '0px 4.5vh'
  },
  data:{
    backgroundColor:'',
    paddingLeft:'1.5vw',
    textAlign:'left'
  }
};
