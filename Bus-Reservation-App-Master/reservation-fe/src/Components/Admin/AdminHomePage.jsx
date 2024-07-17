import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import ViewBus from '../Bus/ViewBus'
import AddBus from '../Bus/AddBus.jsx'
import EditBus from '../Bus/EditBus.jsx'

export default function AdminHomePage() {
  return (
    <div>
        <AdminNavbar/>
      <Routes>
        <Route path='/viewbus' element={<ViewBus/>}/>
        <Route path='/addbus' element={<AddBus/>}/>
        <Route path='/editbus/:id' element={<EditBus/>}/>
      </Routes>

    </div>
  )
}
