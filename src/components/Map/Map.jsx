import React from "react";
import './index.css'
import ViewingCheckIn from "./ViewingNotes/ViewingCheckIn/ViewingCheckIn";
import ViewingHistory from "./ViewingNotes/ViewingHistory/ViewingHistory";
import LogoHome from "../LogoHome/LogoHome"
import ViewingCheckOut from "./ViewingNotes/ViewingCheckOut/ViewingCheckOut";
import ViewingOpening from "./ViewingNotes/ViewingOpening/ViewingOpening";
import ViewingOccupation from "./ViewingNotes/ViewingOccupation/ViewingOccupation";

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