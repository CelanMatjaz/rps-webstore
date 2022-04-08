import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './components/routes/home';
import Layout from './components/layout/layout';
import Catalog from './components/routes/catalog';
import Contact from './components/routes/contact';
import Error404 from './components/routes/error404';
import Login from './components/routes/login';
import Register from './components/routes/register';

export const App: React.FC = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
