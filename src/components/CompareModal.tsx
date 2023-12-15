import React, { useEffect, useState } from 'react'
import Button from './Button';
import MultiChart from './MultiChart';
import { event } from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalCompare } from '../reducers/windowReducer';

const CompareModal = () => {
    const [comparison, setComparison] = useState("infected");
    const [data, setData] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [selected, setSelected] = useState<any>([])
    const [selectedData, setSelectedData] = useState<any>([])
    const lang = useSelector((state:any) => state.window.lang)
    const dispatch = useDispatch()

    useEffect(() => {
        try{
            fetch(`https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true`)
            .then(response =>{
                if(response.ok){
                    return response.json()
                }
            })
            .then((jsonData: any) => {   
                setData(jsonData)             
            })
        }catch(e){
            console.log(e);            
    }
    },[])

    const reset = () => {
        setSelected([])
        setSelectedData([])
        setErrMessage("")
    }

    const handleSelect = (event : any) => {
        setComparison(event.target.value)
    }

    const errorMessage = (err: string) => {
        setErrMessage(err)

        setTimeout(() => {
            setErrMessage("");
          }, 3000);
    }

  return (
    <div className="fixed top-0 flex w-full h-screen z-50 justify-center items-center  bg-opacity-40 bg-gray-900">
        <div className="flex flex-1 flex-col fixed w-4/5 h-4/5 sm:w-4/5 md:w-3/4 z-40 bg-white rounded-lg overflow-hidden">
            <div onClick={()=>{ dispatch(toggleModalCompare({modalCompare:false})) }} className='absolute border-[1px] w-8 h-8 m-2 rounded-3xl flex  justify-center hover:shadow-sm hover:cursor-pointer'>
                <h4 className='text-lg'>
                    x
                </h4>
            </div>
            <div className="flex flex-col py-2 p-1 justify-center items-center text-gray-700 w-full uppercase  dark:bg-gray-700 dark:text-gray-400">
                <h2 className=' text-lg text-center font-medium font-sans'>{lang == "En"?"Select Countries":"Sélectionnez des pays"}</h2>
            </div>
            <div  className="flex   max-h-[190px] p-2  py-4 overflow-scroll bg-[#fff]">
                { data.map((item:any) =>  (
                    <div  key={item.country} onClick={()=>{
                        if ( (selected.includes(item.country) == false) && (selected.length < 3)){
                            // console.log(selected);
                            setSelected([...selected,item.country])
                            setSelectedData([...selectedData, item])
                            console.log(selectedData);
                        }else if (selected.length == 3){
                            errorMessage("Maximum of 3 Countries!!")
                        }
                        else{
                            errorMessage("Duplicates Not Allowed!!")

                        }
                        }}  className={`flex  justify-center items-center px-1  `}>
                        <h3  className={` text-[#352d35] text-sm hover:cursor-pointer  py-1 px-2 font-light rounded-full text-center shadow-md min-w-[100px] ${selected.includes(item.country)? "bg-[#7088b5] text-[#ede8ed]":"bg-[#fff]"} `}>
                        {item.country}
                        </h3>
                    </div>
                )
                )
                
                }
            </div>
            <div className="flex  justify-center">
                <select name="comparison" id="comparison" onChange={handleSelect}>
                    <option value="infected">Infected</option>
                    <option value="deceased">Deceased</option>
                    <option value="tested">Tested</option>
                </select>
                <Button title="Reset" style="red" onClick={()=>reset()}/>
            </div>
            <div className="flex justify-center">
                <p className="font-light text-[#f76262]">{errMessage}</p>
            </div>
            <div className='flex-1 '>
                <MultiChart data={selectedData} comparisonType={comparison}/>
            </div>
        </div>
    </div>
  )
}

export default CompareModal