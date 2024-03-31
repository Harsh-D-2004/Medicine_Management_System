import "./App.css";
import HelloWorld from "./HelloWorld";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MedicinalItems from "./components/ListMedicinesComponent";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Medicine from "./components/Medicine";
import SearchResult from "./components/SearchResult";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path = '/' element = {<MedicinalItems/>}></Route>
          <Route path = '/med' element = {<MedicinalItems/>}></Route>
          <Route path = '/addMedicine' element = {<Medicine/>}></Route>
          <Route path = '/updateMedicine/:id' element = {<Medicine/>}></Route>
          <Route path = '/search-result/:medicineId' element = {<SearchResult/>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
