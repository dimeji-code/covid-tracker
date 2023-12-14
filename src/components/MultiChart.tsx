import React, { useEffect, useState } from 'react'
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

type Props = {
    data: [],
    comparisonType : string
}

const MultiChart = (props: Props) => {
    const [compState,setCompState] = useState(props.comparisonType)
    const lang = useSelector((state:any) => state.window.lang)
    const groups = props.data
    const labels = groups.map((country:any) => country.country)

    var numb:any = [] ;

    if (props.comparisonType == "infected"){
        numb = groups.map((country:any) => country.infected)
    }else if (props.comparisonType == "tested"){
        numb = groups.map((country:any) => country.tested)
    }else if (props.comparisonType == "deceased"){
        numb = groups.map((country:any) => country.deceased)
    }

    console.log("PROPS DATA: ", props.data)
    

    const options = {
        responsive: true,
        indexAxis: 'y' as const,
        plugins: {
            legend: {
            position: 'top' as const,
            },
            title: {
            display: true,
            text: (lang == "En"?'Stats by Country':"Statistiques par pays"),
            },
        },
    };

    const data = {
        labels,
        datasets: [
        {
            label: props.comparisonType,
            data: numb,
            backgroundColor: (props.comparisonType == "deceased"?"rgba(146, 11, 9, 0.903)":'rgba(87, 47, 160, 0.5)'),
        },
        ],
    };

    return (
    <div>
        <Bar options={options} data={data} />
    </div>
    )
}

export default MultiChart