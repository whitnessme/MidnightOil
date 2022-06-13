import { PieChart, Pie, LabelList, Tooltip, Sector, Cell, ResponsiveContainer } from 'recharts';


const StudyResults = () => {

    // const study = JSON.parse(localStorage.study)
    // const ratingData = [
    //     { name: 'Perfect', value: study.count_5 },
    //     { name: 'Easy', value: study.count_4 },
    //     { name: 'Hard', value: study.count_3 },
    //     { name: 'Difficult', value: study.count_2 },
    //     { name: 'Not at all', value: study.count_1 },
    // ]

    const ratingData = [
        { name: 'Not at all', value: 1 },
        { name: 'Difficult', value: 3 },
        { name: 'Hard', value: 1 },
        { name: 'Easy', value: 2 },
        { name: 'Perfect', value: 3 },
    ]

    const ratingColors = [
        "#CA0081",
        "#ffa500",
        "#FFDA00",
        "#60B024",
        "#00A9DB"
    ]

    let renderCustomToolTip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <p>{`${payload[0].name}: ${payload[0].value}`}</p>
                </div>
            );
        }     return null;
    };

    return (
        <div className="study-results-div">
            <PieChart width={500} height={500}>
                <Pie
                    dataKey="value"
                    data={ratingData}
                    cx={200}
                    cy={200}
                    nameKey="name"
                    innerRadius={98}
                    outerRadius={120}
                    labelLine={false}
                    animationBegin={2}
                >
                    {ratingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ratingColors[index]} />
                    ))}
                </Pie>
                <Tooltip content={renderCustomToolTip} coordinate={{x: 150, y: 100}} />
            </PieChart>
        </div>
    );
};
export default StudyResults;