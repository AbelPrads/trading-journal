import React from 'react';
import {Routes, Route}  from 'react-router-dom';
import HomeDashboard from './pages/homeDashboard';
import FetchTrade from './components/homeDashboard/fetchTrade';
import AddTrade from './components/homeDashboard/addTrade';
import UpdateTrade from './components/homeDashboard/updateTrade';
import DeleteTrade from './components/homeDashboard/deleteTrade';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeDashboard />} />
      <Route path='/dashboard/addTrade/' element={<AddTrade />} />
      <Route path='/dashboard/fetchTrade/:id' element={<FetchTrade />} />
      <Route path='/dashboard/updateTrade/:id' element={<UpdateTrade />} />
      <Route path='/dashboard/deleteTrade/:id' element={<DeleteTrade />} />
    </Routes>
  )
}

export default Router;