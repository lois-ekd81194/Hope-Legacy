import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>  
      <NavLink to="/customer/orders/6078e3562c173c4de2cef7f9">CustomerOrders</NavLink>
      <br></br>
      <hr></hr>
    </nav>
  );
}