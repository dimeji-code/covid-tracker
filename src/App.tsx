import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header"
import Body from "./components/Body"
import Toast from "./components/Toast"
import CountryModal from './components/CountryModal';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import CompareModal from './components/CompareModal';

function App() {
  const modal = useSelector((state:any) => state.window.modalOpen)
  const modalCompare = useSelector((state:any) => state.window.modalCompare)



  return (
    <div className="h-full relative">
      <Header />
      <Body/>
      <Toast/>
      {modal && <CountryModal />}
      {modalCompare && <CompareModal />}
      <Footer/>
      
    </div>
  );
}

export default App;
