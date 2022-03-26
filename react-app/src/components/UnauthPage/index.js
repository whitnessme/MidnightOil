import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

const UnauthPage = () => {
    const location = (useLocation()).pathname
    const history = useHistory();

    const handleRedirect = () => {
        history.goBack()
    }

    return (
        <div className="not-auth-div">
            <h1></h1>
            <h2></h2>
            <img className="not-found-img" alt="1840s painting reading by candlelight" src="../../../../static/Pieter-Claesz-A-Vanitas-Still-Life-with-Skull-Books.jpg" ></img>
                <p className="no-thing-text">I think you've gotten lost!</p>
                <p className="head-back-msg" onClick={handleRedirect}>{location === "/unauthorized" ? "You don't own this deck, go back to continue." : "Go back to continue!"}</p>
        </div>
    )
}

export default UnauthPage;