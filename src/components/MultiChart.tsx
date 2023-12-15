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
    const lang = useSelector((state:any) => state.window.lang)
    const groups = props.data
    const labels = groups.map((country:any) => country.country)

    var numb:any = [] ;
    var compLanguage = ""
    // translate and retrieve number for different categories
    if (props.comparisonType == "infected"){
        {lang == "En"?compLanguage = "Infected":compLanguage ="Infecté" }
        numb = groups.map((country:any) => country.infected)
    }
    else if (props.comparisonType == "tested"){
        {lang == "En"?compLanguage = "Tested" :compLanguage = "Testé" }
        numb = groups.map((country:any) => country.tested)
    }else if (props.comparisonType == "deceased"){
        {lang == "En"?compLanguage = "Deceased" :compLanguage = "Décédé" }
        numb = groups.map((country:any) => country.deceased)
    }

    

    const options = {
        responsive: true,
        indexAxis: 'y' as const,
        maintainAspectRatio: false,
        // aspectRatio:,
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
            label: compLanguage,
            data: numb,
            backgroundColor: (props.comparisonType == "deceased"?"rgba(146, 11, 9, 0.903)":'rgba(87, 47, 160, 0.5)'),
        },
        ],
    };

    return (
    <div>
        <Bar width={100} height={300} options={options} data={data} />
    </div>
    )
}

export default MultiChart