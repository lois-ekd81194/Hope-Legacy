import React, { useState} from "react";
import {
  PageContainer,
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "./account/common.jsx";
import { Marginer } from "./account/marginer";
import { changePW } from "../api.js";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
  justify-content: center;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
`;

export const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  z-index: 10;
  margin: 0;
  margin-top: 8px;
`;

export const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
  color: black;
`;

export function ChangePW(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  if (props.loggedIn === true) {
    console.log("here");
    return <h1>Already logged in</h1>;
  }

  function onSubmit() {
    // using API function to submit data to FoodBuddy API
    changePW({
      email: email,
      password: password,
      newPassword: newPassword,
      newPassword2: newPassword2,
    });

    // redirect to homepage
    const state = { redirect: "/" };
    return <Redirect to={state.redirect} />;
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <HeaderText>Change Password</HeaderText>
        <SmallText>Enter your details and new password below</SmallText>
      </HeaderContainer>
      <Marginer direction="vertical" margin="1.5em" />
      <BoxContainer>
        <FiUser size="120px" color="rgba(200, 200, 200, 1)" />
        <Marginer direction="vertical" margin="20px" />
        <FormContainer>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Current Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            placeholder="New password"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
          <Input
            type="password"
            name="newPassword2"
            id="newPassword2"
            value={newPassword2}
            placeholder="Confirm new password"
            onChange={(event) => {
              setNewPassword2(event.target.value);
            }}
          />
        </FormContainer>
        <Marginer direction="vertical" margin="1.5em" />
        <SubmitButton type="submit" onClick={onSubmit}>
          Change Password
        </SubmitButton>
      </BoxContainer>
    </PageContainer>
  );
}
