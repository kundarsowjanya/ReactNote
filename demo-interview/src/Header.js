
import { useState } from 'react';

function Header({country}) {
 const [name, setName] = useState("Sowjnaya");
  return (
    <header>
      <h1>Welcome to the Demo Interview</h1>
      <div>Hello {name} </div>
      <button onClick={()=>setName("Dipika")}>Change Name</button>
      <div>From {country}</div>
    </header>
  );
}

export default Header;