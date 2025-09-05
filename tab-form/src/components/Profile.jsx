function Profile({data,setData,error
}) {
   const {name,age,email}=data

   const handlechange=(e,item)=>{
      setData((prevData)=>({
         ...prevData,
         [item]:e.target.value
      }))
   }


     return(
        <div>
           <div>
             <label>Name : </label>
              <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>handlechange(e,"name")}/>
              {error.name&&<span className="error">{error.name}</span>}
           </div>
           <div>
              <label>Age : </label>
              <input type="number"  value={age} onChange={(e)=>handlechange(e,"age")}/>
               {error.age&&<span className="error">{error.age}</span>}
            </div>
            <div>
           <label>Email : </label>
           <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>handlechange(e,"email")}/>
             {error.email&&<span className="error">{error.email}</span>}
           </div>

        </div>
     )
}

export default Profile