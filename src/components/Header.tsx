import React from 'react'
import logo from '../logo.svg';
import { useSelector, useDispatch } from 'react-redux'
import { toggleLanguage, toggleModalCompare, toggleToast } from '../reducers/windowReducer';
import $ from 'jquery';

const Header = () => {

  const dispatch = useDispatch()
  const lang = useSelector((state:any) => state.window.lang)
  const toast = useSelector((state:any) => state.window.toastOpen)
  
  const toastFunction = () =>{
    dispatch(toggleToast({toastOpen: true}))
    setTimeout(() =>{
      dispatch(toggleToast({toastOpen: false}))

    }, 3500)
  }


  const goToByScroll = (id:string) =>{
    console.log('scrolling...')
    $('html,body').animate({scrollTop: $("#"+id).offset()!.top},'slow');
  }

  return (
  
<nav className=" bg-neutral-800 px-2 sm:px-4 py-3.5  fixed w-full z-20  top-0 left-0 ">

  <div className="container flex flex-wrap justify-between items-center mx-auto">
  <a  className="flex items-center">
      <img src={logo} className="App-logo" alt="logo" />
  </a>
  <div className="flex md:order-2">
      <button onClick={()=>{ dispatch(toggleLanguage({}));toastFunction(); }} type="button" className="text-white outline-0 bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <span className={lang=="En"?"text-green-400":""}>EN</span>  | <span className={lang=="Fr"?"text-green-400":""}> FR</span>  
      </button>
        
  </div>
  <div className=" justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-1 mt-4  rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-neutral-800 md:bg-[neutral-800]">
      <li className=" justify-between items-center w-full md:flex md:w-auto md:order-1">
        <a onClick={()=> goToByScroll('country')} className="block py-2 pr-4 pl-3 text-blue-100 text-base decoration-4 cursor-pointer hover:text-white rounded md:bg-transparent md:text-blue-100 md:p-0 dark:text-white" aria-current="page">
          {lang == "En"?"Countries":"Des pays"}
          </a>
      </li>
      <li className=" justify-between items-center w-full md:flex md:w-auto md:order-1">
        <a onClick={() =>{ dispatch( toggleModalCompare({modalCompare : true})) }} className="block py-2 pr-4 pl-3 text-blue-100 text-base decoration-4 cursor-pointer hover:text-white rounded md:bg-transparent md:text-blue-100 md:p-0 dark:text-white" aria-current="page">
        {lang == "En"?"Compare":"Comparer"}
          </a>
      </li>

    </ul>
  </div>
  </div>
</nav>

  )
}

export default Header