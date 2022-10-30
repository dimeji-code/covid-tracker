import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toggleModal } from '../reducers/windowReducer'

const CountryModal = () => {
    const lang = useSelector((state:any) => state.window.lang)
    const country = useSelector((state:any) => state.window.country)
    const countryApi = useSelector((state:any) => state.window.countryApi)
    const dispatch = useDispatch()
    const [data, setData] = useState({infected:null,deceased:null,recovered:null, activeCases:null,tested:null,critical:null,lastUpdatedAtApify:""})

    useEffect(() =>{

        fetch(countryApi)
        .then(response =>{
          if(response.ok){
            return response.json()
          }
        })
        .then((jsonData: any) => {
          setData(jsonData)
          console.log("JSON DATA: ",jsonData)
          console.log("country is: ",country)
        })
    },[])

    const parseDate = (dateString:string) =>{
        return (dateString).split("T")[0];
    }

    return (
    <div className="fixed top-0 flex w-full h-screen z-50 justify-center items-center  bg-opacity-40 bg-gray-900">
        
        <div className="fixed w-3/4 h-3/4 sm:w-3/4 md:w-2/4 z-40 bg-slate-200 rounded-lg overflow-hidden">
           {data && <table className=" text-sm text-left text-gray-500 dark:text-gray-400 w-full h-50">
                <thead className="flex text-gray-700 w-full uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className=" w-full mb-3 items-center justify-center flex">
                        <th scope="col" className="py-3 px-6 flex items-center justify-center w-full">
                            {country}
                        </th> 
                        
                        
                    </tr>
                </thead>
                <tbody className="bg-grey-light  items-center flex flex-col justify-between overflow-y-scroll scrTable w-full " >
                <tr className=" w-full mb-3 flex justify-between">
                        <th scope="col" className="py-3 px-6 w-2/4">
                           {lang=="En"?"Infected:":"Infecté:"}
                        </th> 
                        <th scope="col" className="py-3 px-6 w-3/4">
                            {data.infected!=null?data.infected:"N/A"}
                        </th>  
                    </tr>
                    <tr className=" w-full mb-3 flex justify-between">
                        <th scope="col" className="py-3 px-6 w-2/4">
                            {lang=="En"?"Deceased:":"Défunt:"}
                        </th> 
                        <th scope="col" className="py-3 px-6 w-3/4">
                            {data.deceased!=null?data.deceased:"N/A"}
                        </th>  
                    </tr>
                    <tr className=" w-full mb-3 flex justify-between">
                        <th scope="col" className="py-3 px-6 w-2/4">
                            {lang=="En"?"Active Cases:":"Cas actifs:"}
                        </th> 
                        <th scope="col" className="py-3 px-6 w-3/4">
                            {data.activeCases!=null?data.activeCases:"N/A"}
                        </th>  
                    </tr>
                    <tr className=" w-full mb-3 flex justify-between">
                        <th scope="col" className="py-3 px-6 w-2/4">
                            {lang=="En"?"Tested:":"Testé:"}
                        </th> 
                        <th scope="col" className="py-3 px-6 w-3/4">
                            {data.tested!=null?data.tested:"N/A"}
                        </th>  
                    </tr>
                    <tr className=" w-full mb-3 flex justify-between">
                        <th scope="col" className="py-3 px-6 w-2/4">
                            {lang=="En"?"Critical:":"Critique:"}
                        </th> 
                        <th scope="col" className="py-3 px-6 w-3/4">
                            {data.critical!=null?data.critical:"N/A"}
                        </th>  
                    </tr>
                    <tr className=" w-full mb-3 flex justify-between">
                        <th scope="col" className="py-3 px-6 w-2/4">
                            {lang=="En"?"Last Updated:":"Dernière mise à jour:"}
                        </th> 
                        <th scope="col" className="py-3 px-6 w-3/4">
                            {data.lastUpdatedAtApify!=""? parseDate(data.lastUpdatedAtApify):"N/A"}
                        </th> 
                    </tr>
                    
                </tbody>
                <div className="flex flex-col justify-center items-center overflow-y-scroll">
                    <button onClick={()=>{ dispatch(toggleModal({modalOpen:false})) }} type="button" className="text-white outline-0 bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span className="">{lang=="En"?"Exit":"Sortir"}</span>   
                    </button>
                </div>
            </table> }
        </div>
        
    </div>
  )
}

export default CountryModal


