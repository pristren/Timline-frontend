import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateEvent from "./components/Events/CreateEvent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/event" element={<CreateEvent />} />
      </Routes>
    </>
  );
}

export default App;
