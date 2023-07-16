import React from "react";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useState } from 'react';
import Modal from '../components/Modal';
import {divStyle,
  EditButton,
  LogOffBtn,
  ListContainer,
  Linke
} from "../components/CustomerStyle";
import Header from "../components/CustomerHeader"



export default function Profile(props) {
  const customer = props.history.location.state.customer;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function editHandler() {
    setModalIsOpen(true);
  }
  
  //logout function
  function logout(){
    localStorage.clear();
    window.location.href = "/customer";
  }
  //function for contronlling Modal
  function closeModalHandler() {
    setModalIsOpen(false);
  }
  function Backdrop(props) {
    return <div className='backdrop' onClick={props.onCancel} />;
  }
  return (
    <div>
      <Header link = "/customer" type = "Profile"/>   
      <div style = {divStyle}>
        <AccountCircle style = {{color: "rgb(241, 196, 70)", fontSize: 150}}/>
      </div>
      <div style = {divStyle}><h4>{customer.givenName}</h4></div>
        <div style={divStyle}>
          <EditButton onClick={editHandler} >Edit</EditButton>
          <LogOffBtn onClick = {logout}>Logout</LogOffBtn>
        </div>
        {modalIsOpen && (
          <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />
        )}
        {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
       
        <div >
          <Linke href = {"/customer/orders/"+customer._id}><ListContainer> &ensp;history</ListContainer>
          </Linke>
          <Linke href = {"/customer/order/"+customer.currentOrder} >
            <ListContainer > &ensp;order</ListContainer>
          </Linke>
          
        </div>
      </div>
  );
}
