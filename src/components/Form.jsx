import React, { useState } from 'react'

function Form({ onSubmit,formData,setFormData }) {


    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type="text" placeholder='enter name' name='name' value={formData.name} onChange={handleInput} />
            <label htmlFor='age'>age</label>
            <input type="text" placeholder='enter name' name='age' value={formData.age} onChange={handleInput} />
            <select value={formData.classType} name='classType' onChange={handleInput} >
                <option value="react">React</option>
                <option value="java">Java</option>
            </select>
            <button>add member</button>
        </form>
    )
}

export default Form