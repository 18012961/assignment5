import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
//import NavBar from "./components/NavBar";
import Create from "./components/Create";
import Questionnaire from './components/Questionnaire'
 
 

function App() {
  return (
    <>
  
   
    
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        
        <Route path='/create' element={<Create/>}/>
        <Route path='/questionnaire' element= {<Questionnaire/>}/> 
      </Routes>

    
    
    
    </>
   
  );
}
 // element is to pass the component 
export default App;
