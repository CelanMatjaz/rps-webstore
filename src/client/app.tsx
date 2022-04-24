import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Home from './components/routes/home';
import Layout from './components/layout/layout';
import Catalog from './components/routes/catalog';
import Contact from './components/routes/contact';
import Error404 from './components/routes/error404';
import Login from './components/routes/login';
import Register from './components/routes/register';
import Item from './components/routes/items/item';
import Account from './components/routes/account';
import Cart from './components/routes/cart';

import { useAppDisptach } from './store/hooks';
import { login } from './store/auth';

export const App: React.FC = () => {
  const dispatch = useAppDisptach();
  const [isCheckingForLogin, setIsCheckingForLogin] = useState(true);

  useEffect(() => {
    async function fetchLogin() {
      const res = await fetch('/api/account/check', { method: 'POST' });
      if (res.status === 200) {
        const { data } = await res.json();
        dispatch(login(data));
      }
      setIsCheckingForLogin(false);
    }
    fetchLogin();
  }, []);

  if (isCheckingForLogin) return <div></div>;

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/items/:id' element={<Item />} />
          <Route path='/account' element={<Account />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
