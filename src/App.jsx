import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
