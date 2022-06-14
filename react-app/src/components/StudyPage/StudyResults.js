import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Label } from 'recharts';


const StudyResults = ({ deckId }) => {
    
    const [percent, setPercent] = useState(80);

    
    const proficiencyData = [
        { name: `Percent completed`, value: percent },
    ]
    
    // useEffect(() => {
    //     // Use points route to calculate the profiency percentage (current points/total points)--from card curr_ratings
    //     (async () => {
    //         await fetch(`/api/decks/${deckId}/points`).then( async (res) => {
    //             if (res.ok) {
    //                 await res.json().then(async (res) => {
    //                     setPercent(res.points)
    //                 })
    //             } else {
    //                 await res.json().then(res => {
    //                     console.log(res)
    //                 })
    //             }
    //         })
    //     })();
    // }, [])
    
    // -- REAL VERSION -- COMMENT BACK IN --
    const study = JSON.parse(localStorage.study)
    const totalCount = study.count_5 + study.count_4 + study.count_3 + study.count_2 + study.count_1
    const ratingData = [
        { name: `Perfect:`, value: (2 / 12) * percent },
        { name: `Easy:`, value: (1 / 12) * percent },
        { name: `Hard:`, value: (2 / 12) * percent },
        { name: `Difficult:`, value: (5 / 12) * percent },
        { name: `Not at all:`, value: (2 / 12) * percent },
        { name: `${100 - percent}% left`, value: (100 - percent) }
    ]
    // const ratingData = [
    //     { name: `Perfect: ${study.count_5}`, value: (study.count_5 / totalCount) * percent },
    //     { name: `Easy: ${study.count_4}`, value: (study.count_4 / totalCount) * percent },
    //     { name: `Hard: ${study.count_3}`, value: (study.count_3 / totalCount) * percent },
    //     { name: `Difficult: ${study.count_2}`, value: (study.count_2 / totalCount) * percent },
    //     { name: `Not at all: ${study.count_1}`, value: (study.count_1 / totalCount) * percent },
    //     { name: `${100 - percent}% left`, value: (100 - percent) }
    // ]
    
    

    // Added grey for the percentage that isn't done for pie chart
    const ratingColors = [
        "#60B024",
        "#00A9DB",
        "#FFDA00",
        "#ffa500",
        "#CA0081",
        "lightgrey"
    ]

    const [posData, setPosData] = useState();
    const RADIAN = Math.PI / 180;
    let xPos = 0;
    let yPos = 0;
    if (posData) {
        const radius = posData.innerRadius + (posData.outerRadius - posData.innerRadius) *
        (posData.midAngle < 225 && posData.midAngle > 120 ? 4.5 : 1.5);
        xPos = posData.cx + radius * Math.cos(-posData.midAngle * RADIAN);
        yPos = posData.cy + radius * Math.sin(-posData.midAngle * RADIAN);
        console.log(xPos)
    }
    
    let renderCustomToolTip = ({ active, payload, cx }) => {
       
        if (active) {
                return (
                    <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                        <text textAnchor={xPos > cx ? 'start' : 'end'} dominantBaseline="central">{`${payload[0].name}`}</text>
                    </div>
                );
        }     return null;
    };

    const CustomLabel = ({ viewBox }) => {
        const { cx, cy } = viewBox;
        return (
            <>
                <text x={percent < 10 ? cx - 20 : percent === 100 ? cx - 43 : cx - 30} y={cy} style={{
                    fontSize: "35px",
                    fontWeight: "400",
                    fontFamily: 'Montserrat'
                }}>
                    {percent}%
                </text>
                <text x={cx - 60} y={cy + 30} style={{
                            fontSize: "22px",
                            fontWeight: "300",
                            fontFamily: 'Montserrat'
                        }}>
                    proficiency
                </text>
            </>
        );
    };


    return (
        <div className="study-results-div">
            <PieChart width={500} height={500}>

                <Pie
                    dataKey="value"
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    nameKey="name"
                    innerRadius={98}
                    outerRadius={120}
                    labelLine={false}
                    animationBegin={2}
                    onMouseOver={(data) => {
                        console.log("data", data.midAngle);
                        setPosData(data);
                      }}
                >
                    {ratingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ratingColors[index]}
                         />
                        ))}
                    <Label
                        content={CustomLabel}
                        position="center"
                        fill="grey"
                    />
                </Pie>
                <Tooltip
                    content={renderCustomToolTip}
                    position={{x:xPos, y:yPos}}
                    // position={{
                    //     x: ( (posData < 110 && posData > 80) ? 220 : (posData < 288 && posData > 250) ? 220 : (posData > 90 && posData < 270) ? 58 : 380),
                    //     y: (posData < 110 && posData > 80) ? 85 : (posData < 288 && posData > 250) ? 380 : "auto"
                    // }}
                />
            </PieChart>
        </div>
    );
};
export default StudyResults;