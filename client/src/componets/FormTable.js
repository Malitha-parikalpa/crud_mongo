import React from 'react'
import "../App.css"
import { CgCloseO } from "react-icons/cg";

export const FormTable = ({handleSubmit,hadleOnChange,Handleclose,rest}) => {
  return (
    <div className="addContainer">
          <form onSubmit={handleSubmit}> 
          <div className="close-btn"  onClick={Handleclose}><CgCloseO/></div>
  
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={hadleOnChange} value={rest.name}/>
  
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={hadleOnChange} value={rest.email}/>
  
            <label htmlFor="mobile">Mobile</label>
            <input type="number" id="mobile" name="mobile" onChange={hadleOnChange} value={rest.mobile}/>
  
            <button className="btn">Submit</button>
   
          </form>
    </div>
  )
}
