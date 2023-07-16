import React, {useState} from "react";
import { Marginer } from "../pages/account/marginer";
import { loginVendor } from "../api.js";
import { Redirect } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import {
  PageContainer,
  VendorHeader,
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "./VendorComponents.js";

export function VendorLogin(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    // using API function to submit data to FoodBuddy API
    loginVendor({
      name: name,
      password: password,
    });

    // redirect to homepage
    const state = { redirect: "/" };
    return <Redirect to={state.redirect} />;
  }

  return (
    <PageContainer>
      <VendorHeader>Login</VendorHeader>
      <BoxContainer>
        <FaRegUser size="x1" />
        <Marginer direction="vertical" margin="80px" />
        <FormContainer>
          <Input
            type="username"
            name="name"
            id="name"
            value={name}
            placeholder="Van name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <Marginer direction="vertical" margin="30px" />
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </FormContainer>
        <Marginer direction="vertical" margin="80px" />
        <SubmitButton type="submit" onClick={onSubmit}>
          Login
        </SubmitButton>
      </BoxContainer>
      <Marginer direction="vertical" margin="80px" />
    </PageContainer>
  );
}

export default VendorLogin;
