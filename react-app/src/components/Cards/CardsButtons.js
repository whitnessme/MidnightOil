
const CardsButtons = ({ setShowCardsListTab, setShowCreateCardsTab }) => {

    const handlePreviewClick = (e) => {
        e.preventDefault()
        setShowCreateCardsTab(false)
        setShowCardsListTab(true)
    }
    
    const handleEditClick = (e) => {
        e.preventDefault()
        setShowCardsListTab(false)
        setShowCreateCardsTab(true)
    }

    return (
        <div className="cards-buttons-container">
            <button onClick={handlePreviewClick}>Preview Cards</button>
            <button onClick={handleEditClick}>Edit Cards</button>
        </div>
    )
}

export default CardsButtons;