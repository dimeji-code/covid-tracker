import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );



const BarChart = (props:any) => {
  var province = props.data;
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
    const lang = useSelector((state:any) => state.window.lang)

    const labels = province.map((item:any)=>item.region);
    console.log("PROPS DATA: ", props.data);
    
    const numb =province.map((item:any)=>item.infectedCount/1000);
    const deceased = province.map((item:any)=>item.deceasededCount);

    const options = {
        responsive: true,
        aspectRatio:1,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: (lang == "En"?'Reported cases by Province (1,000x)':"Cas signalés par province (1,000x)"),
          },
        },
      };

     const data = {
        labels,
        datasets: [
          {
            label: (lang == "En"?'Reported Cases':"Cas signalés"),
            data: numb,
            backgroundColor: 'rgba(154, 105, 243, 0.5)',
          },
          // {
          //   label: (lang == "En"?'Deceased':"Défunt"),
          //   data: deceased,
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
          
        ],
      };

    return <Bar options={options} data={data}  />;

}

export default BarChart