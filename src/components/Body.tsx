import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import BarChart from './BarChart'
import CountryTable from './CountryTable'
import DataTable from "./DataTable"

const Body = () => {
  const [canadaData, setCanadaData] = useState({infected:null,deceased:null});
  const [worldData, setWorldData] = useState<any>([]);
  const [stateCases, setStateCases] = useState([])
  const [loading, setLoading] = useState(true);
  const lang = useSelector((state:any) => state.window.lang)
  const modal = useSelector((state:any) => state.window.modalOpen)
  const modalCompare = useSelector((state:any) => state.window.modalCompare)

  useEffect(() =>{
    // fetch canada data
    fetch("https://api.apify.com/v2/key-value-stores/fabbocwKrtxSDf96h/records/LATEST?disableRedirect=true")
    .then(response => {
      if(response.ok){
        return response.json()
      }
    })
    .then((jsonData: any) => {
      setCanadaData(jsonData)
      setStateCases(jsonData.infectedByRegion.filter((item:any) => (item.region != "Canada" && item.region!= "Repatriated travellers"))) 
    })

// fetch country data
    try{
      fetch(`https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true`)
      .then(response =>{
          if(response.ok){
          return response.json()
          }
      }
      )
      .then((jsonData: any) => {                
          setWorldData(jsonData)
          console.log(jsonData)
      })
  }catch(e){
      console.log(e);  
  }

  },[])

  useEffect(() => {
    // if modal is open, disable scrolling
    if (modal == true || modalCompare == true){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow ="scroll"
    }
  },[modal, modalCompare])

  return (
    <div className={` bgbg px-6 py-8 mt-8 md:mt-0 pt-28 flex h-full z-20 `}>
      
        <div className="container align-baseline space-y-6 my-6 mx-auto sm:px-4 w-full flex-col-reverse md:flex-row ">
          <div className="container text-center space-y-2">
            <h3 className="text-white text-3xl sm:text-4xl">{
              lang == "En"?
            "This is a summary of Covid-19 statistics in Canada.":
            "Ceci est un résumé des statistiques de Covid-19 au Canada."
            }</h3>
            <h4 className="hidden text-white text-3xl sm:block">{
            lang == "En"?
            "To visualise the overall impact by province and territory.":
            "Pour visualiser l'impact global par province et territoire."
            }</h4>
            <h4 className="text-gray-500 text-sm sm:text-lg">{
            lang == "En"?
            "Disclaimer: Data might not be up to date. Use Countries table below to confirm time of most recent update.":
            "Avis de non-responsabilité : les données peuvent ne pas être à jour. Utilisez le tableau des pays ci-dessous pour confirmer l'heure de la mise à jour."
            }</h4>
          </div>
            
          <div className="container flex w-full space-x-4 justify-evenly" style={{minHeight:'400px'}}>
            <BarChart data={stateCases} />
          </div>
          <DataTable data={stateCases} inf={canadaData.infected} dec={canadaData.deceased} />

          <div id="country" className="container text-center py-7 space-y-2">
            <h3 className="text-white my-6 text-4xl">{
            lang == "En"?
            "View Covid-19 statistics by country":
            "Voir les statistiques Covid-19 par pays"
            }</h3>
            <h4 className="text-white text-2xl">{
            lang == "En"?
            "Find more information under details.":
            "Trouvez plus d'informations sous détails."
            }</h4>

          </div>
          <div>
            <CountryTable />
          </div>

        </div>

    </div>
  )
}

export default Body