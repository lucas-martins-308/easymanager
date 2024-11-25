import React from "react";
import './index.css'
import ViewingCheckIn from "./ViewingNotes/ViewingCheckIn/ViewingCheckIn.jsx";
import ViewingHistory from "./ViewingNotes/ViewingHistory/ViewingHistory.jsx";
import LogoHome from "../../components/LogoHome/LogoHome.jsx"
import ViewingCheckOut from "./ViewingNotes/ViewingCheckOut/ViewingCheckOut.jsx";
import ViewingOpening from "./ViewingNotes/ViewingOpening/ViewingOpening.jsx";
import ViewingOccupation from "./ViewingNotes/ViewingOccupation/ViewingOccupation.jsx";

export default function Map() {

    return(
        <>
        <div id="map">
            <ViewingCheckIn/>
            <ViewingCheckOut/>
            <ViewingOpening/>
            <ViewingHistory/>
            <ViewingOccupation/>
            <LogoHome/>
        </div>
        </>
    )
}