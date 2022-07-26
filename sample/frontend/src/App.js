import React from 'react';
import './App.css';
import LoginPage from './container/LoginPage';
import StaffPage from './container/StaffPage';
import ManagerPage from './container/ManagerPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StaffRoute from './StaffRoute';
import ManagerRoute from './ManagerRoute';
import AddDepartmentPage from './container/AddDepartmentPage';
import EditDepartmentPage from './container/EditDepartmentPage';
import CreateAccount from './container/CreateAccount';
import SalaryPage from './container/SalaryPage';
import CreatePayout from './container/CreatePayout'

function App() {
  return (
    <div className="Main">
      <BrowserRouter>
        <Routes>
          <Route index element={
            <LoginPage />
          } />
          <Route path="/staff" element={
            <StaffRoute>
              <StaffPage />
            </StaffRoute>
          } />
          <Route path="/manager" element={
            <ManagerRoute>
              <ManagerPage />
            </ManagerRoute>
          } />
          <Route path="/manager/addDepartment" element={
            <ManagerRoute>
              <AddDepartmentPage />
            </ManagerRoute>
          } />
          <Route path="/manager/editDepartment/:id" element={
            <ManagerRoute>
              <EditDepartmentPage />
            </ManagerRoute>
          } />
          <Route path="/manager/createEmployeeAccount" element={
            <ManagerRoute>
              <CreateAccount />
            </ManagerRoute>
          } />
          <Route path="/manager/salary" element={
            <ManagerRoute>
              <SalaryPage />
            </ManagerRoute>
          } />
          <Route path="/manager/createPayout" element={
            <ManagerRoute>
              <CreatePayout />
            </ManagerRoute>
          } />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
