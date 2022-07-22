import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Label, ResponsiveContainer } from 'recharts';
import { useHistory } from 'react-router-dom';


const StudyResults = ({ deckId, setShowResults, setProgressColors }) => {
    
    const [percent, setPercent] = useState(20);
    const [totalCardCounts, setTotalCardCounts] = useState({});
    const [totalCards, setTotalCards] = useState(0)
    const [showCurrent, setShowCurrent] = useState(false)

    const history = useHistory()
    
    useEffect(() => {
        // Use points route to calculate the profiency percentage (current points/total points)--from card curr_ratings
        (async () => {
            await fetch(`/api/decks/${deckId}/points`).then( async (res) => {
                if (res.ok) {
                    await res.json().then(async (res) => {
                        console.log(res)
                        setPercent(res.total_points)
                        setTotalCardCounts(res)
                        setTotalCards(res.total_cards)
                        console.log(totalCards)
                    })
                } else {
                    await res.json().then(res => {
                        console.log(res)
                    })
                }
            })
        })();
    }, [])

    const handleMoreStudy = () => {
        // Reset study object
        localStorage.study = JSON.stringify({deck_id: deckId, progress: [], cards: [], count_1: 0, count_2: 0, count_3: 0, count_4: 0, count_5: 0});
        // Reset progress shapes filled
        setProgressColors([])
        // Go back to seeing the cards
        setShowResults(false)
    }
    
    const study = JSON.parse(localStorage.study)
    const totalCount = study.count_5 + study.count_4 + study.count_3 + study.count_2 + study.count_1
    
    // const proficiencyData = [
    //     { name: `Percent completed`, value: percent },
    // ]
    // Fake version for testing: 
    // const ratingData = [
    //     { name: `Perfect:`, value: (2 / 12) * percent },
    //     { name: `Easy:`, value: (1 / 12) * percent },
    //     { name: `Hard:`, value: (2 / 12) * percent },
    //     { name: `Difficult:`, value: (5 / 12) * percent },
    //     { name: `Not at all:`, value: (2 / 12) * percent },
    //     { name: `${100 - percent}% left`, value: (100 - percent) }
    // ]

    // -- REAL VERSION -- COMMENT BACK IN --
    const ratingData = [
        { name: `Perfect: ${totalCardCounts['5']}`, value: (totalCardCounts['5'] / totalCards) * percent },
        { name: `Easy: ${totalCardCounts['4']}`, value: (totalCardCounts['4'] / totalCards) * percent },
        { name: `Hard: ${totalCardCounts['3']}`, value: (totalCardCounts['3'] / totalCards) * percent },
        { name: `Difficult: ${totalCardCounts['2']}`, value: (totalCardCounts['2'] / totalCards) * percent },
        { name: `Not at all: ${totalCardCounts['1']}`, value: (totalCardCounts['1'] / totalCards) * percent },
        { name: `${100 - percent}% left`, value: (100 - percent) }
    ]
    
    const ratingData10 = [
        { name: `Perfect: ${study.count_5}`, value: (study.count_5 / totalCount) * percent },
        { name: `Easy: ${study.count_4}`, value: (study.count_4 / totalCount) * percent },
        { name: `Hard: ${study.count_3}`, value: (study.count_3 / totalCount) * percent },
        { name: `Difficult: ${study.count_2}`, value: (study.count_2 / totalCount) * percent },
        { name: `Not at all: ${study.count_1}`, value: (study.count_1 / totalCount) * percent }
    ]
    

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
    const [posData2, setPosData2] = useState();

    const RADIAN = Math.PI / 180;
    let xPos = 0;
    let yPos = 0;
    if (posData) {
        const radius = posData.innerRadius + (posData.outerRadius - posData.innerRadius) *
        (posData.midAngle < 225 && posData.midAngle > 120 ? 4.5 : posData.midAngle > 60 && posData.midAngle <= 120 ? 2.8 : 1.8);
        xPos = posData.cx + radius * Math.cos(-posData.midAngle * RADIAN);
        yPos = posData.cy + radius * Math.sin(-posData.midAngle * RADIAN);
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

    const CustomLabelRound = ({ viewBox }) => {
        const { cx, cy } = viewBox;
        return (
            <>
                <text x={ cx - 20} y={cy} style={{
                    fontSize: "35px",
                    fontWeight: "400",
                    fontFamily: 'Montserrat'
                }}>
                    10
                </text>
                <text x={cx - 30} y={cy + 30} style={{
                            fontSize: "22px",
                            fontWeight: "300",
                            fontFamily: 'Montserrat'
                        }}>
                    cards
                </text>
            </>
        );
    };


    return (
        <div className="study-results-div">
            <h1 className='checkpoint'>Checkpoint!</h1>
            <div className='checkpoint-info-div'>
                <div className='what-div'>
                    <p className='what-is-this'>What is this?</p>
                    <div className='info-popup-div'>
                        <p>The leading cognitive science research indicates that periodic feedback about your progress reinforces the retention of information.</p>
                    </div>
                </div>
            </div>
            <div className='piechart-div'>
                <ResponsiveContainer>
                    <PieChart>
                        {!showCurrent ?
                            <Pie
                            id='overall-pie-chart'
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
                        :
                        <Pie
                        id='current-pie-chart'
                        dataKey="value"
                        data={ratingData10}
                        cx="50%"
                        cy="50%"
                        nameKey="name"
                        innerRadius={98}
                        outerRadius={120}
                        labelLine={false}
                        animationBegin={2}
                        onMouseOver={(data) => {
                            setPosData(data);
                        }}
                        >
                            {ratingData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={ratingColors[index]}
                                />
                                ))}
                            <Label
                                content={CustomLabelRound}
                                position="center"
                                fill="grey"
                                />
                        </Pie>
                        }
                        <Tooltip
                            content={renderCustomToolTip}
                            position={{x:xPos, y:yPos}}
                            />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div>
                {totalCardCounts['0'] ?
                    <h2>{totalCardCounts['0']} more cards till you've studied the whole deck!</h2>
                    :
                    <h2>{100 - percent}% left to reach 100% proficiency!</h2>
                }
            </div>
            <div className='checkpoint-buttons-div'>
                <button onClick={() => history.push('/dashboard')} >Back to Dashboard</button>
                <button onClick={handleMoreStudy} >Study 10 more cards</button>
            </div>
        </div>
    );
};
export default StudyResults;