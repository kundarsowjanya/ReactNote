function Interest({data,setData,error}) {
    const {interests}=data

    const handleChange=(e)=>{
       setData((prevData)=>({
         ...prevData,
         interests:e.target.checked?
         [...prevData.interests,e.target.name]:
         prevData?.interests.filter((item)=>item!==e.target.name)
       }))
     }

     console.log(interests)
     return(
        <div>
          <div>
            <label>
               <input type="checkbox" name="Cooking" checked={interests.includes("Cooking")} onChange={handleChange}/>
               Cooking
            </label>
          </div>
         <div>
            <label>
               <input type="checkbox" name="Music" checked={interests.includes("Music")} onChange={handleChange}/>
               Music
            </label>
          </div>
            <div>
            <label>
               <input type="checkbox" name="Reading" checked={interests.includes("Reading")} onChange={handleChange}/>
               Reading
            </label>
          </div>
              {error.interests&&<span className="error">{error.interests}</span>}
        </div>
     )
}

export default Interest