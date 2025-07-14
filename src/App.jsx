import { useState } from "react";
import Navbar from "./components/navbar";
import Newsboard from "./components/Newsboard";

const App = () => {
  const[category,setCategory] = useState("general");
  const [country, setCountry] = useState("in");
  return (
    <div>
      <Navbar setCategory={setCategory} setCountry={setCountry} />
      <Newsboard category={category} country={country} />
    </div>
  )
}

export default App;