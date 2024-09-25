import React from "react";
import './index.css'
import ViewingNotes from "../ViewingNotes/ViewingNotes";
import LogoHome from "../LogoHome/LogoHome"
import MenuDropdown from "../TopBar/MenuDropdown/MenuDropdown";

export default function() {

    return(
        <>
        <div id="home">
        <MenuDropdown/>

            <ViewingNotes/>
            <ViewingNotes/>
            <ViewingNotes/>
            <ViewingNotes/>
            <ViewingNotes/>
            <LogoHome/>
        </div>
        </>
    )
}