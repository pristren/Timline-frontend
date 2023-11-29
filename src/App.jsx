import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateEvent from "./components/Events/CreateEvent";

function App() {
  return (
    <div className="max-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/event" element={<CreateEvent />} />
      </Routes>
    </div>
  );
}

export default App;
