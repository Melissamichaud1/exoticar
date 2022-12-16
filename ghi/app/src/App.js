import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import MainPage from "./MainPage";
import Nav from "./Nav";
import "./App.css";
import "./Account.css";
import AutomobileForm from "./Inventory/AutomobileForm";
import AutomobileList from "./Inventory/AutomobileList";

import ManufacturerForm from "./Inventory/ManufacturerForm";
import ManufacturerList from "./Inventory/ManufacturerList";

import ModelForm from "./Inventory/VehicleModelForm";
import ModelList from "./Inventory/VehicleModelList";
import ModelListPagani from "./Inventory/VehicleModelListPagani";
import ModelListMclaren from "./Inventory/VehicleModelListMclaren";
import ModelListBugatti from "./Inventory/VehicleModelListBugatti";

import ServiceAppointmentList from "./Service/ServiceAppointmentList";
import ServiceAppointmentForm from "./Service/ServiceAppointmentForm";
import ServiceHistoryList from "./Service/ServiceHistoryList";
import TechForm from "./Service/TechForm";

import CustomerForm from "./Sales/CustomerForm";
import SalesmanForm from "./Sales/SalesmanForm";
import SalesList from "./Sales/SalesList";
import SaleForm from "./Sales/SaleForm";
import FilteredSalesList from "./Sales/FilteredSalesList";

import { Login } from "./Login";
import { Register } from "./Register";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="automobiles">
            <Route path="" element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="manufacturers">
            <Route path="" element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route path="" element={<ModelList />} />
            <Route path="new" element={<ModelForm />} />
            <Route path="pagani" element={<ModelListPagani />} />
            <Route path="mclaren" element={<ModelListMclaren />} />
            <Route path="bugatti" element={<ModelListBugatti />} />
          </Route>
          <Route path="service">
            <Route path="" element={<ServiceAppointmentList />} />
            <Route path="new" element={<ServiceAppointmentForm />} />
            <Route path="history" element={<ServiceHistoryList />} />
          </Route>
          <Route path="technicians">
            <Route path="" />
            <Route path="new" element={<TechForm />} />
          </Route>
          <Route path="customers">
            <Route path="" />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="salesmen">
            <Route path="" />
            <Route path="new" element={<SalesmanForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="new" element={<SaleForm />} />
            <Route path="history" element={<FilteredSalesList />} />
          </Route>
          <Route path="login">
            <Route
              path=""
              element={
                currentForm === "login" ? (
                  <Login onFormSwitch={toggleForm} />
                ) : (
                  <Register onFormSwitch={toggleForm} />
                )
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
