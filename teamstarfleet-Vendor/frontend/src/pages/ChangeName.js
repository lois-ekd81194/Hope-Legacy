import React, { useState} from "react";
import {
  PageContainer,
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "./account/common.jsx";
import { Marginer } from "./account/marginer";
import { FiUser } from "react-icons/fi";
import {HeaderContainer, SmallText, HeaderText} from "./ChangePW";
import {useCustomerDtatil, changeName} from "../api";


export default function ChangeName(){
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const {loading, customer, error} = useCustomerDtatil(localStorage.getItem("email"));
    console.log(customer);
    if(!customer){
        return <p>please login first</p>
    }
    function onSubmit(){
        if(!firstname && lastname){
            changeName({
                familyName: lastname,
                givenName: customer.givenName,
            })
        }else if(firstname && !lastname){
            changeName({
                familyName: customer.familyName,
                givenName: firstname,
            })
        }else{
            changeName({
                familyName: lastname,
                givenName: firstname,
            })
        }
        return;
    }

    return(
        <PageContainer>
            <HeaderContainer>
                <HeaderText>Change Name</HeaderText>
                <SmallText>Enter your New Family Name/Given Name</SmallText>
            </HeaderContainer>
            <BoxContainer>
                <FiUser size="120px" color="rgba(200, 200, 200, 1)" />
                <Marginer direction = "vertical" margin="20px"/>
                <FormContainer>
                    <Input
                        type = "name"
                        name = "firstName"
                        id = "FirstName"
                        value = {firstname}
                        placeholder = "Given Name"
                        onChange={(event)=>{
                            setFirstName(event.target.value);
                        }}    
                    />
                    <Input
                        type = "name"
                        name = "lastName"
                        id = "lastName"
                        value = {lastname}
                        placeholder = "Family Name"
                        onChange={(event)=>{
                            setLastName(event.target.value);
                        }}    
                    />
                </FormContainer>
                <Marginer direction="vertical" margin="1.5em" />
                <SubmitButton type="submit" onClick={onSubmit}>
                    Confirm
                </SubmitButton>
            </BoxContainer>
        </PageContainer>
    )

}