
const ProgressShapes = () => {

    let numOfShapes = [1,2,3,4,5,6,7,8,9,10]

    return (
        <div className="progress-image-div">
                {numOfShapes.map((ele, i) => (
            <svg width="40" height="100%">
                    <rect id={`shape-{ele}`} className="progress-shape" x="10" y="10" rx="10" ry="10" fill="grey" width="30" height="60"/>
            </svg>
                    )
                )}
        </div>
    )
}

export default ProgressShapes;