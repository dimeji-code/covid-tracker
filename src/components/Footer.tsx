import React from 'react'

const Footer = () => {
    const date = new Date();

  return (
    <div className=" bg-slate-200 px-5   sm:px-4 py-8  w-full z-20 ">
        <div className="flex flex-col sm:flex-row container mx-auto flex-wrap sm:space-x-5 w-5/6 sm:w-5/6 md:w-2/3 lg:w-1/2  sm:justify-between">
            <div className=""> 
                <h3 className=" text-lg font-semibold">Tools Used</h3>

                <li className="list-none"><a href="https://reactjs.org/" className=" text-sm text-slate-700">Reactjs</a></li>
                <li className="list-none"><a  className=" text-sm text-slate-700">Redux</a></li>
                <li className="list-none"><a href="https://tailwindcss.com/" className=" text-sm text-slate-700">Tailwind CSS</a></li>
            </div>
            <div className="hidden sm:flex  sm:flex-col"> 
                <h3 className=" text-lg font-semibold">Donation Links</h3>

                <li className="list-none"><a href="https://www.unicef.ca/en/what-we-do/donate-to-coronavirus" className=" text-sm text-slate-700 ">UNICEF</a></li>
                <li className="list-none"><a href="https://www.canadahelps.org/en/donate-to-coronavirus-outbreak-response/" className=" text-sm text-slate-700">CanadaHelps</a></li>
                <li className="list-none"><a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate" className=" text-sm text-slate-700">WHO</a></li>
            </div>
            <div className=""> 
                <h3 className=" text-lg font-semibold">Sources</h3>

                <li className="list-none"><a href="https://apify.com/covid-19" className=" text-sm text-slate-700 ">Apify</a></li>
            </div>
        </div>
        <div className="flex sm:container mx-auto flex-wrap mt-5 space-x-10 w-5/6 sm:w-1/2 justify-between">
        © {date.getFullYear()} dimeji-code. All rights reserved.
        </div>
     </div>
  )
}

export default Footer