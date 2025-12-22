import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SmartToDo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setError] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let newError = {};

   if (!email.trim()) {
      newError.email = "Email is required";
    } else if (!email.includes("@") || !email.endsWith(".com")) {
      newError.email = "Enter a valid email with @ and .com";
    }
    
    if (!phone.trim()) { newError.phone = "Phone number is required";
    }else if (phone.length >10 || phone.length<10){
       newError.phone = "Enter a valid 10 digit phone number";

    }
    if (!name.trim()) newError.name = "Name is required";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      navigate("/todo", { state: { name } });
    }
  };

  return (
    <div className='bg-emerald-300 min-h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='border-4 bg-white flex flex-col gap-4 p-6'
      >
        <h2 className='text-2xl text-black text-center'>Login</h2>

        <div>
          <label>Email</label>
          <input
            type='text'
            className='border w-full p-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className='text-red-500'>{errors.email}</p>}
        </div>

        <div>
  <label>Phone number</label>
  <input
    type="text"
    className="border w-full p-2"
    value={phone}
    onChange={(e) => {
      const value = e.target.value;

      // allow only digits & max 10 characters
      if (/^\d{0,10}$/.test(value)) {
        setPhone(value);
      }
    }}
  />
  {errors.phone && <p className="text-red-500">{errors.phone}</p>}
</div>


        <div>
          <label>Name</label>
          <input
            type='text'
            className='border w-full p-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className='text-red-500'>{errors.name}</p>}
        </div>

        <button
          type="submit"
          className='bg-emerald-900 text-white text-xl rounded-2xl p-2'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SmartToDo;
