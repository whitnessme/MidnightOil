
const CardsButtons = ({ setShowCardsListTab, setShowCreateCardsTab, setHideOverflow }) => {

    const handlePreviewClick = (e) => {
        e.preventDefault()
        setShowCreateCardsTab(false)
        setShowCardsListTab(true)
        setHideOverflow("auto")
    }
    
    const handleEditClick = (e) => {
        e.preventDefault()
        setShowCardsListTab(false)
        setShowCreateCardsTab(true)
        setHideOverflow("hidden")
    }

    return (
        <div className="cards-buttons-container">
            <button onClick={handlePreviewClick}>Preview Cards</button>
            <button onClick={handleEditClick}>Edit Cards</button>
        </div>
    )
}

export default CardsButtons;