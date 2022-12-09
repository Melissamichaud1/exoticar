import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomobileForm from "./Inventory/AutomobileForm";
import AutomobileList from "./Inventory/AutomobileList";

import ManufacturerForm from "./Inventory/ManufacturerForm";
import ManufacturerList from "./Inventory/ManufacturerList";

import VehicleModelForm from "./Inventory/VehicleModelForm";
import ModelList from "./Inventory/VehicleModelList";

import ServiceAppointmentList from "./Service/ServiceAppointmentList";
import ServiceAppointmentForm from "./Service/ServiceAppointmentForm";
import ServiceHistoryList from "./Service/ServiceHistoryList";
import TechForm from "./Service/TechForm";

import CustomerForm from './Sales/CustomerForm';
import SalesmanForm from './Sales/SalesmanForm';
import SalesList from './Sales/SalesList';

function App(props) {
  if (props === undefined) {
    return null;
  }
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
          <Route path="new" element={<VehicleModelForm />} />
        </Route>
        <Route path="service">
            <Route path="" element={<ServiceAppointmentList />} />
            <Route path="new" element={<ServiceAppointmentForm />} />
            <Route path="history" element={<ServiceHistoryList />} />
        </Route>
        <Route path="technicians">
            <Route path=""/>
            <Route path="new" element={<TechForm />} />
        </Route>
        <Route path="customers">
            <Route path=""/>
            <Route path="new" element={<CustomerForm />} />
        </Route>
        <Route path="salesmen">
            <Route path=""/>
            <Route path="new" element={<SalesmanForm />} />
        </Route>
        <Route path="sales">
            <Route path="" element={<SalesList/>} />
            {/* <Route path="new" element={<SalesForm />} /> */}
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
