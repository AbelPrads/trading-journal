import React from 'react';
import {Routes, Route}  from 'react-router-dom';
import homeDashboard from './pages/homeDashboard';
import fetchTrade from './pages/fetchTrade';
import addTrade from './pages/addTrade';
import updateTrade from './pages/updateTrade';
import deleteTrade from './pages/deleteTrade';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<homeDashboard />} />
      <Route path='/dashboard/addTrade/' element={<addTrade />} />
      <Route path='/dashboard/fetchTrade/:id' element={<fetchTrade />} />
      <Route path='/dashboard/updateTrade/:id' element={<updateTrade />} />
      <Route path='/dashboard/deleteTrade/:id' element={<deleteTrade />} />
    </Routes>
  );
};

export default  App;