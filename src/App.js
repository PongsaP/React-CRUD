import Axios from 'axios';
import { useState } from 'react';

function App() {

  // usestate for insert data
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  // usestate to show data
  const [employeesList, setEmployeeList] = useState([]);

  // Get DATA from server
  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((Response) => {
      setEmployeeList(Response.data);
    });
  }

  const addEmployees = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      setEmployeeList([
        ...employeesList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        }
      ])
    })
  }

  const updateEmployeeWage = (id) => {
    Axios.put('http://localhost:3001/update', { wage: newWage, id: id }).then((Response) => {
      setEmployeeList(
        employeesList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            age: val.age,
            country: val.country,
            position: val.position,
            wage: newWage
          } : val;
        })
      )
    })
  }

  const deleteEmployeeWage = (id => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((Response) => {
      setEmployeeList(
        employeesList.filter((val) => {
          return val.id != id;
        })
      )
    })
  })


  return (
    <div className="App container">
      <h1>Employee Infomation</h1>
      <div className="information mt-3">
        <form action="">
          <div className="form-floating mb-3">
            <input type="text" className="form-control" placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value)
              }} />
            <label htmlFor="name" className="form-label">Enter name</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" placeholder="Enter age"
              onChange={(event) => {
                setAge(event.target.value)
              }} />
            <label htmlFor="age" className="form-label">Enter age</label>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" placeholder="Enter country"
              onChange={(event) => {
                setCountry(event.target.value)
              }} />
            <label htmlFor="country" className="form-label">Enter country</label>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" placeholder="Enter position"
              onChange={(event) => {
                setPosition(event.target.value)
              }} />
            <label htmlFor="position" className="form-label">Enter position</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" placeholder="Enter wage"
              onChange={(event) => {
                setWage(event.target.value)
              }} />
            <label htmlFor="wage" className="form-label">Enter wage</label>
          </div>
          <button className="btn btn-outline-success" onClick={addEmployees}>Add Employee</button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button className="btn btn-outline-primary" onClick={getEmployees} >Show Employee</button>

        {/* Show data by usesing map in col */}
        {employeesList.map((val, key) => {
          return (
            <div className="employee card mt-3">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Age: {val.age}</p>
                <p className="card-text">Country: {val.country}</p>
                <p className="card-text">Position: {val.position}</p>
                <p className="card-text">Wage: {val.wage}</p>
                <div className="d-flex">
                  <input type="number"
                    placeholder='00000'
                    style={{ width: "300px" }}
                    className='form-control'
                    onChange={(event) => {
                      setNewWage(event.target.value)
                    }}
                  />
                  <button className="btn btn-outline-warning" onClick={() => { updateEmployeeWage(val.id) }}>Update</button>
                  <button className="btn btn-outline-danger" onClick={() => { deleteEmployeeWage(val.id) }}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
