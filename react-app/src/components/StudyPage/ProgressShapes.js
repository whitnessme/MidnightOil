
const ProgressShapes = ({ fill }) => {

    let numOfShapes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div className="progress-image-div">
            {numOfShapes.map((num) => (
                <svg width="40" height="70">
                    <rect id={`shape-${num}`} className="progress-shape" x="5" y="5" rx="10" ry="10" fill={fill} width="30" height="60"/>
                </svg>
                )
            )}
        </div>
    )
}

export default ProgressShapes;