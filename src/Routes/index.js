import { Route, Routes } from "react-router-dom";
import MainSection from "../Container/MainSection";
import NewResource from "../Container/NewResource";

const Paths = () => (
  <Routes>
    <Route path="/" element={<MainSection />} />
    <Route path="/add-resource" element={<NewResource />} />
  </Routes>
);

export default Paths;
