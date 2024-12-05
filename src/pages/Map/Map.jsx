import './index.css'
import ViewingCheckIn from "../../components/ViewingNotes/ViewingCheckIn/ViewingCheckIn.jsx";
import ViewingHistory from "../../components/ViewingNotes/ViewingHistory/ViewingHistory.jsx";
import LogoHome from "../../components/LogoHome/LogoHome.jsx"
import ViewingCheckOut from "../../components/ViewingNotes/ViewingCheckOut/ViewingCheckOut.jsx";
import ViewingOpening from "../../components/ViewingNotes/ViewingOpening/ViewingOpening.jsx";
import ViewingOccupation from "../../components/ViewingNotes/ViewingOccupation/ViewingOccupation.jsx";

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