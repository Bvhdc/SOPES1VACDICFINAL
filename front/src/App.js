
import './App.css';
import {useState} from "react"
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
function App() {

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [edit,setEdit]=useState(false);
  const [id,setId]=useState("");

  const [usuariosList,setUsuarios] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create",{
      username:username,
      password:password
    }).then(()=>{
      getUsuarios();
      alert("user added")});
  }

  const editUser = (val) =>{
    setEdit(true);
    setUsername(val.username)
    setPassword(val.password)
    setId(val.username)
}

  const getUsuarios = () => {
    Axios.get("http://localhost:3001/usuarios").then((response)=>{
      setUsuarios(response.data);
    });
  }

  const limpiarCampos = ()=>{
    setUsername("");
    setPassword("");
    setId("");
    setEdit(false);
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      username:username,
      password:password,
    }).then(()=>{
      getUsuarios();
      limpiarCampos();
      
    });
  }
  const deleteUser = (val)=>{

  
        Axios.delete(`http://localhost:3001/delete/${val.username}`).then((res)=>{
          getUsuarios();
          limpiarCampos();
        
        
      
    });

    
  }
  //getUsuarios();

  return (
    <div className="container">
   
        <div className="card text-center">
      <div className="card-header">
        Examen Final
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Username:</span>
        <input onChange={(event) => {
          setUsername(event.target.value);
        }} type="text" className="form-control" placeholder="Username" value={username} aria-label="Username" aria-describedby="basic-addon1"></input>
        </div>
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Password:</span>
        <input onChange={(event) => {
          setPassword(event.target.value);
        }} type="text" className="form-control" placeholder="Password" value={password} aria-label="Password" aria-describedby="basic-addon1"></input>
        </div>
      </div>
      <div className="card-footer text-muted">
        {
          edit? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Update user</button> 
          <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
          </div>
          :<button className='btn btn-success' onClick={add}>Registrar</button>
        }
      <button className='btn btn-success' onClick={getUsuarios}>Update</button>
      </div>
    </div>
    <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Password</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
    {usuariosList.map((val, key) => {
      return <tr key={key}>
          <td>{val.username}</td>
          <td>{val.password}</td>
          <td><div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" onClick={
                ()=>{
                  editUser(val)
                }
                
              } className="btn btn-info">Editar</button>
              <button type="button" className="btn btn-danger" onClick={()=>{
                        deleteUser(val);
                      }}>Eliminar</button>
</div></td>
        </tr>
      
    })}
</tbody>

    </table>
    </div>
  );
}

export default App;
