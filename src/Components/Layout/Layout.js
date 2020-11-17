import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Error from 'next/error';
import Categorias from '../Categorias/Categorias';
import Puntajes from '../Clasificacion/Clasificacion';
import Loader from '../../Components/Spinner/Spinner';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Layout = ({ children }) => {
  const { data: categorias, error: errorCat } = useSWR(
    'https://localhost:5001/api/categoria',
    fetcher
  );

  const { data: puntajes, error: errorPunt } = useSWR(
    'https://localhost:5001/api/customqueries/ordenarusuarios',
    fetcher
  );

  if (errorCat || errorPunt) return <Error />;
  if (categorias && puntajes) {
    return (
      <div>
        <NavBar />
        <div style={{ display: 'flex' }}>
          <Categorias listacategorias={categorias} />
          {children}
          <Puntajes listaClasificacion={puntajes} />
        </div>
        <Footer />
      </div>
    );
  }
  return <Loader />;
};

export default Layout;
