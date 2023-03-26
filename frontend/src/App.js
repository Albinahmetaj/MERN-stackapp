import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WorkoutUpdateForm from "./components/WorkoutUpdateForm";
import Testpage from "./pages/Testpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update/:id" element={<WorkoutUpdateForm />} />
            <Route path="/Testpage" element={<Testpage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
