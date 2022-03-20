import CardPreview from "../Cards/CardPreview"

const CardsListTab = ({ cards }) => {
    return (
        <div className="cards-list-tab-container">
            {cards?.map((card, i) => (
                <CardPreview card={card} idx={i + 1} />
            ))}
        </div>
    )
}

export default CardsListTab;