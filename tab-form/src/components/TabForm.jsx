import Settings from "./Settings"
import Interest from "./Interest"
import Profile from "./Profile"
import { use, useState } from "react"

function TabForm() {
    const [activeTab,setActiveTab]=useState(0)
    
    //keep data in parent component makes it easy to share data between components
    const [data,setData]=useState({
        name:"Sowjanya",
        age:27,
        email:"g.sowjanya15@gmail.com",
        interests:["Cooking","Reading"],
        theme:"dark"
    })

    const [error,setError]=useState({})

    const tabs=[
        {
            name:"Profile",
            component:Profile,
            validate:()=>{
                const err={}
                if(!data.name||data.name.length<3){
                   err.name="Name is required and should be more than 3 characters"
                }
                if(!data.age||data.age<18){
                    err.age="Age is required and should be more than 18"
                }
                if(!data.email||data.email<2){
                   err.email="Email is required or not valid"
                }

                setError(err)

                return err.name || err.age || err.email ? false:true

            }
        },
        {
            name:"Interests",
            component:Interest,
            validate:()=>{
                const err={}
                if(!data.interests||data.interests.length<1){
                   err.interests="Select atleast one interest"
                }
                
                setError(err)

                return err.interests ? false:true

            }
        },
        {
            name:"Settings",
            component:Settings,
            validate:()=>{return true}
        }
    ]


    const ActiveTabComponnet=tabs[activeTab].component
    
    const handleSubmit=()=>{
      console.log(data)
    }

    const handleNext=()=>{
       if(tabs[activeTab].validate()){
        setActiveTab((prev)=>prev+1)
       }
    }

    const handlePrev=()=>{
       if(tabs[activeTab].validate()){
        setActiveTab((prev)=>prev-1)
       }
    }

     return(
        <div>
       <div className="heading-container">
       {
        tabs.map((tab,index)=>{
             return(
                <div className="heading" key={index} onClick={()=>tabs[activeTab].validate()&&setActiveTab(index)}>{tab.name}</div>
             )
        })
       }
       </div>
       <div className="tab-body">
        <ActiveTabComponnet data={data} setData={setData} error={error}/>
        </div>
        <div>
            {activeTab!==0&&<button onClick={handlePrev}> Prev</button>}
            {activeTab!==tabs.length-1&&<button onClick={handleNext}> Next</button>}
            {activeTab===tabs.length-1&&<button onClick={handleSubmit}> Submit</button>}
        </div>
       </div>
     )
}

export default TabForm