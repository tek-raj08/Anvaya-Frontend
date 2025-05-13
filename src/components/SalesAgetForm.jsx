import React, { useState } from 'react'
import './SalesAgentForm.css'
const SalesAgetForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            const response = await fetch("https://anvaya-backend-7zaqzfvdx-tek-rajs-projects.vercel.app/agents", {
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(formData)
            })

            if(!response.ok){
                throw "Failed to add sales agent."
            }

            const data = await response.json();
            console.log("Sale Agent is added successfully.", data)

        }catch(error){
            console.error("failed to add sale agent:", error)
        }
    }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label className='form-label' htmlFor="salesAgent">Enter Name: </label>
      <input className='form-input' type="text" name="name" id="salesAgent" value={formData.name} onChange={handleChange} placeholder='Enter Name' required />
      <br /><br />

      <label className='form-label' htmlFor="email">Email:</label>
      <input className='form-input' type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder='Enter Email' required/>
      <br /><br />

      <button className='add-agent-button' type='submit'>Add New Agent</button>
    </form>
  )
}

export default SalesAgetForm
