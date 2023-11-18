import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCountry, toggleModal } from '../reducers/windowReducer';
import CountryModal from './CountryModal';

const CountryTable = () => {
    const lang = useSelector((state:any) => state.window.lang)
    const modal = useSelector((state:any) => state.window.modalOpen)
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        try{
            fetch(`https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true`)
            .then(response =>{
                if(response.ok){
                return response.json()
                }
            }
            )
            .then((jsonData: any) => {                
                setData(jsonData)
                console.log(jsonData)
            })
        }catch(e){
            console.log(e);            
    }
  
    },[])

    const showModal = (con:string,api:string) => {
        dispatch(toggleModal({modalOpen: true}))
        dispatch(setCountry({country: con,countryApi:api}))
        // console.log("modal should be open");
        console.log("modal should be open");
        
        // return(<CountryModal />)
    }

  return (
    
<div  className="overflow-x-auto relative shadow-md sm:rounded-lg w-full z-10">
    <table className=" text-sm text-left text-gray-500 dark:text-gray-400 w-full">
        <thead className="flex text-gray-700 w-full uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="flex w-full mb-3">
                <th scope="col" className="py-3 px-6 w-1/4">
                    {lang=="En"?"Country":"Pays"}
                </th>
                <th scope="col" className="py-3 px-6 w-1/4">
                    {lang=="En"?"# Infected":"# Infecté"}
                </th>
                <th scope="col" className="py-3 px-6 w-1/4">
                    {lang=="En"?"Deceased":"Défunt"}
                </th>
                <th scope="col" className="py-3 px-6 w-1/4">
                    {lang=="En"?"Details":"Détails"}
                </th>
                
            </tr>
        </thead>
        <tbody className="bg-grey-light  items-center flex flex-col justify-between overflow-y-scroll scrTable w-full " >

            
        {
                data && data.map((item:any) =>( 
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex w-full ">
                        <th scope="row" className="py-4 px-6 w-1/3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.country}
                        </th>
                        <td className="py-4 px-6 w-1/3">
                            {item.infected}
                        </td>
                        <td className="py-4 px-6 w-1/3">
                            {item.deceased}
                        </td>
                        <td className="py-4 px-6 w-1/3">
                            <a  onClick={()=>{showModal(item.country,item.moreData)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                                {lang=="En"?"See More":"Voir plus"}
                            </a>
                        </td>
                    </tr>
                ))
            
            }
            
            
        </tbody>
    </table>
    
</div>

  )
}


export default CountryTable