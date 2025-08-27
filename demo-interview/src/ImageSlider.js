
import { useEffect, useState } from "react";
const data=[
    "https://www.pixelstalk.net/wp-content/uploads/2016/08/Random-Abstract-Wallpaper.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.L2mBo6YIz75Bt8_oX6JU4wHaHa?pid=Api",
    "https://tse2.mm.bing.net/th/id/OIP.fkMAj3MhuDaNpoTuM14EhQHaNK?pid=Api",
    "https://tse1.mm.bing.net/th/id/OIP.7iD6-4xujPbQ7d3uhV2ugQHaEK?pid=Api",
    "https://tse4.mm.bing.net/th/id/OIP.lUxosJJl_3vrGA5tWGKJRQHaEo?pid=Api"

]



function ImageSlider() {

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(()=>{
       const timer= setTimeout(()=>{
            setActiveIndex((activeIndex+1)%data.length)
        },5000)
        return()=>clearTimeout(timer)
    },[activeIndex])

    function handleNext(){
        if(activeIndex===data.length-1) setActiveIndex(0)
        else
        setActiveIndex(activeIndex+1)
    }

      function handlePrevious(){
        if(activeIndex===0) setActiveIndex(data.length-1)
        else
        setActiveIndex(activeIndex-1)
    }
 
    return (
    <div className="ImageSlider">
     <button onClick={handlePrevious}>Previous</button>
     {data.map((url,index)=>
      <img src={url} key={index} alt={`Hi ${index}`} style={{width:"500px",height:"300px", display:activeIndex===index?"":"none"}}/>
     )}
       <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default ImageSlider;