import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';

const DataTable = (props:any) => {

	const lang = useSelector((state:any) => state.window.lang)
    var province = props.data
    for(var i in province){
        console.log(province[i]);

        if(province[i].region == "Newfoundland and Labrador"){
            province[i].region = "Newfoundland"
        }
        if(province[i].region == "Northwest Territories"){
            province[i].region = "N.W. Territories"
        }
        if(province[i].region == "Prince Edward Island"){
            province[i].region = "P.E.I"
        }
        
    }

    return (
    
<div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
    <table className=" text-sm text-left text-gray-500 dark:text-gray-400 w-full">
    <thead className="flex text-gray-700 w-full  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <div className="w-full border-b-2">
            <h2 className="py-3 px-6 w-2/3 text-xl font-medium">Canada</h2>

            <tr className=" w-full mb-3 indent-5">
                <h2 className="py-3 px-6 w-full text-md font-medium">
                    {lang=="En"?"Total Cases : ":"Nombre de cas : "}
                <span> {parseInt(props.inf)?.toLocaleString()}</span>  
                </h2>
            </tr>
            <tr className=" w-full mb-3 indent-5">
                <h2 className="py-3 px-6 w-full text-md font-medium">
                    {lang=="En"?"Total Deaths : ":"Des morts : "}
                <span> {parseInt(props.dec)?.toLocaleString()}</span>
                </h2>
            </tr>
        </div>
        
    </thead>
        <thead className="flex text-gray-700 w-full uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="flex w-full mb-3">
                <th scope="col" className="py-3 px-6 w-1/3">
                    {lang=="En"?"State":"Etat"}
                </th>
                <th scope="col" className="py-3 px-6 w-1/3">
                    {lang=="En"?"# Infected":"# Infecté"}
                </th>
                <th scope="col" className="py-3 px-6 w-1/3">
                    {lang=="En"?"Deceased":"Défunt"}
                </th>
                
            </tr>
        </thead>
        <tbody className="bg-grey-light  items-center flex flex-col justify-between overflow-y-scroll scrTable w-full " >

            
        {
                  province.map((item:any) =>(
                    <tr key={item.region} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex w-full ">
                        <th scope="row" className="py-4 px-6 w-1/3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.region}
                        </th>
                        <td className="py-4 px-6 w-1/3">
                            {parseInt(item.infectedCount)?.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 w-1/3">
                            {parseInt(item.deceasedCount)?.toLocaleString()}
                        </td>
                    </tr>
                ))
            
            }
            
            
        </tbody>
    </table>

</div>

  )
}

export default DataTable