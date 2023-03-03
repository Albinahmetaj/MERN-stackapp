import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import WorkoutUpdateForm from './components/WorkoutUpdateForm';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
    <Navbar/>
   <div className="pages">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/update/:id" element={<WorkoutUpdateForm/>}/>
    </Routes>
   </div>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
