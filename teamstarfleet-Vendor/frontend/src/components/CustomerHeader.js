import React from "react";
import {headerTextStyles,returnStyle} from "../components/CustomerStyle";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn"
import {Link} from "react-router-dom";

export default function Header(props){
    return(
        <header style = {{ backgroundColor: "rgb(241, 196, 70)"}}>
        <Link to = {props.link}><KeyboardReturn style = {returnStyle}/></Link>
        <h1 style ={headerTextStyles}>
          {props.type}
        </h1>
      </header>
    )
}