import React,{useState} from 'react'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:8080/api/roles');
  const roles = await res.json();
  return {
    props: {
      roles:roles
    }
  }
}



const AddUser = ({ roles }) => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rolesList, setRolesList] = useState([])
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    let rolesListObject =[]
    rolesList.forEach(item => {
      rolesListObject.push({"id":item})
    })

    // testObject= {
    //     "name": name,
    //     "username":username,
    //     "password": password,
    //     "roles":rolesListObject
    // }

    
    
    fetch('http://localhost:8080/api/user/save', {
      method: 'POST',
      body: JSON.stringify(
        {
          "name": name,
          "username":username,
          "password": password,
          "roles":rolesListObject
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const handleCheck = (idx) => {
    var updatedList = [...rolesList];
    if (event.target.checked) {
      updatedList = [...rolesList, idx];
    } else {
      updatedList.splice(updatedList.indexOf(Number(event.target.id)), 1);
    }
    setRolesList(updatedList);




    };

  return (
        <form className="row gy-2 gx-3 align-items-center my-3 mx-3">
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="inputName">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="inputUsername">Username</label>
                <div className="input-group">
                <div className="input-group-text">@</div>
                <input type="text" className="form-control" id="inputUsername" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
            </div>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="inputPassword"  >Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
            </div>

            {
              roles.map((item,idx) => {
                  return (
                        <div className="col-auto" key={item.id}>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id={item.id} onChange={()=>handleCheck(item.id)} value={item.id} />
                            <label className="form-check-label" htmlFor="autoSizingCheck">
                                {item.name}
                            </label>
                            </div>
                        </div>    
                    )                  
              })
            }

            <div className="col-auto">
                <button type="submit" className="btn btn-primary" onClick={e=>handleSubmit(e)}>Add User</button>
          </div>
        </form>
  )
}

export default AddUser