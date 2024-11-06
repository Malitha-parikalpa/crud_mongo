
import './App.css';
import { useState } from 'react';
import axios from "axios"
import { useEffect } from 'react';
import { FormTable } from './componets/FormTable';

axios.defaults.baseURL = "http://localhost:3000/"

function App() {

  const [addSection,setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false)
  const [formData,setFormData] = useState({
    name : "",
    email : "",
    mobile : "",
  })
  const [formDataedit,setFormDataedit] = useState({
    name : "",
    email : "",
    mobile : "",
    _id : ""
    
  })
  const [datalist,seDatalist] = useState([])

  const hadleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve) =>{
      return {
        ...preve,
        [name] : value
      }
    })
  }
 const handleSubmit =async(e)=>{
   e.preventDefault()
   const data = await axios.post("/create",formData)
   console.log(data)
   if(data.data.success){
    setAddSection(false)
    alert(data.data.message)
    getFetchData()
    setFormData({
      name : "",
      email : "",
      mobile : "",
    })
   }
 }

 const getFetchData = async()=>{
  const data = await axios.get("/")
  console.log(data)
   if(data.data.success){
    seDatalist(data.data.data)
    
   }
 }

 useEffect(()=>{
  getFetchData()
 },[])

const handleDelete = async(id)=>{
  const data = await axios.delete("/delete/"+id)
  
  if(data.data.message){
    getFetchData()
    alert(data.data.message)
    
  }
}
const handleUpdate = async(e)=>{
  e.preventDefault()
  const data = await axios.put("/update/",formDataedit)
  if(data.data.message){
    getFetchData()
    alert(data.data.message)
    setEditSection(false)
    
  }
  
}

const hadleEditOnChange = async(e)=>{
  const {value,name} = e.target
  setFormDataedit((preve) =>{
    return {
      ...preve,
      [name] : value
    }
  })
}

 const handleEdit = (e1)=>{
  setFormDataedit(e1)
  setEditSection(true)
 }
  return (
    <>
    <div className = "container">
      <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

      {
        addSection && (
          <FormTable
          handleSubmit = {handleSubmit}
          hadleOnChange = {hadleOnChange}
          Handleclose = {()=> setAddSection(false)}
          rest = {formData}
          
          />
          
        )
      }
      {
        editSection &&(
          <FormTable
          handleSubmit = {handleUpdate}
          hadleOnChange = {hadleEditOnChange}
          Handleclose = {()=> setEditSection(false)}
          rest = {formDataedit}
          />
        )
      }

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {datalist[0] ?(
              datalist.map((e1)=>{
                console.log(e1)
                  return(
                    <tr>
                      <td>{e1.name}</td>
                      <td>{e1.email}</td>
                      <td>{e1.mobile}</td>
                      <td>
                      <button className='btn btn-edit' onClick={()=>handleEdit(e1)}>Edit</button>
                      <button className='btn btn-delete' onClick={()=>handleDelete(e1._id)}>Delete</button>
                      </td>
                    </tr>
                  )
              }))
                :(
                  <p style={{textAlign : "center"}}>No data</p>
                )
            }
            
          </tbody>
        </table>
      </div>

    </div>
    </>
  );
  
}
export default App;
