/***
 * home page of the front end app 
 * the wavy effect  
 * reference: https://www.codingfrontend.com/2021/02/simple-wavy-effect-using-css-with-svg.html
 */
import React from "react";
import {Btn,Btn_v} from '../components/CustomerStyle';
import "../components/Homepage.css"

export default function Home() {
  localStorage.clear();
  return (
    <body>
      <div className = "header">
        <div className = "team-name">
          <h1>Team Starfleet</h1>
        </div>
        <div className ="Buttons">
         <Btn_v onClick ={()=>window.location.href="/vendor"}>
           Vendor</Btn_v>
         <Btn onClick ={()=>window.location.href="/customer"}>
           Customer</Btn>
        </div>
        
        <div>
        <svg class="waves" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink= "http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28" preserveAspectRatio="none" 
          shape-rendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="background_wave">
        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
      </g>
    </svg>
        </div>
      </div>
    </body>
  );
}
