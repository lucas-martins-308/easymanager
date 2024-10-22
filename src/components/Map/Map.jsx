import React from "react";
import './index.css'
import ViewingHistory from "../ViewingNotes/ViewingHistory/ViewingHistory";
import ViewingCheckIn from "../ViewingNotes/ViewingCheckIn/ViewingCheckIn";
import LogoHome from "../LogoHome/LogoHome"

export default function Map() {

    return(
        <>
        <div id="map">
            <ViewingCheckIn/>
            <ViewingHistory/>
            <LogoHome/>
        </div>
        </>
    )
}