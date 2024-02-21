import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import HomePage from "./page/HomePage";




function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
    </Routes>
  );
}

export default App;
