import React from 'react';
import {Routes, Route}  from 'react-router-dom';
import HomeDashboard from './pages/homeDashboard/homeDashboard';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeDashboard />} />
    </Routes>
  )
}

export default Router;