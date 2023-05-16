import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'


const SignupForm = () => {

  const [formData, setFormData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : ""
  })

  const [showPassword, setShowPassword] = useState(false)

  function changeHandler(event){
    setFormData((prevData) =>(
      {
        ...prevData,
        [event.target.name] : event.target.value
      }
    ))
  }
  return (
    <div>
       <div>
      {/* student instructor tab  */}
          <button>Studnet</button>
          <button>Instructor</button>
      </div>

      <form action="">
        {/* this contains firstName and LastName  */}
        <div>

          <label htmlFor="">
            <p>First Name <sup>*</sup> </p>
            <input type="text" required name='firstName' onChange={changeHandler} placeholder='Enter First Name' value={formData.firstName}/>

          </label>

          <label htmlFor="">
            <p>Last Name <sup>*</sup> </p>
            <input type="text" required name='lastName' onChange={changeHandler} placeholder='Enter Last Name' value={formData.lastName}/>
          </label>
          
        </div>

        <label htmlFor="">
            <p>Email Address<sup>*</sup> </p>
            <input type="email" required name='email' onChange={changeHandler} placeholder='Enter Email Address' value={formData.email}/>
            
        </label>

        {/* create Password and confirmPassword fields          */}
        <div>
          <label htmlFor="">
              <p>Create Password<sup>*</sup> </p>
              <input type={showPassword ? "text" : "password"} required name='password' onChange={changeHandler} placeholder='Enter Password' value={formData.password}/>

              <span onClick={() =>setShowPassword((prev) => !prev)}>
              {/* this function helps us toggle between true and false of showPassword on clik of the image  */}
              {/* these are 2 icons which will be used to show or hide password  */}
              {showPassword ? (
                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye></AiOutlineEye>
              )}
              </span>
          </label>

          <label htmlFor="">
              <p>Confirm Password<sup>*</sup> </p>
              <input type={showPassword ? "text" : "password"} required name='confirmPassword' onChange={changeHandler} placeholder='Enter Confirm Password' value={formData.confirmPassword}/>


              <span onClick={() =>setShowPassword((prev) => !prev)}>
              {/* this function helps us toggle between true and false of showPassword on clik of the image  */}
              {/* these are 2 icons which will be used to show or hide password  */}
              {showPassword ? (
                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye></AiOutlineEye>
              )}
              </span>
          </label>
        </div>
        
        <button>Create Account</button>
      </form>
    </div>
   
  )
}

export default SignupForm