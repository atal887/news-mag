import { useState } from "react";
import Navbar from "./components/navbar";
import Newsboard from "./components/Newsboard";

const App = () => {
  const[category,setCategory] = useState("general");
  return (
    <div>
      <Navbar setCategory={setCategory}/>
      <Newsboard category={category}/>

    </div>
  )
}

export default App;