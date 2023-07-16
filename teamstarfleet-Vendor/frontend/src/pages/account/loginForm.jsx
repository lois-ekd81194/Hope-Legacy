import React, { useContext, useState, useEffect } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "./marginer.jsx";
import { AccountContext } from "./accountContext.js";
import { LoginUser } from "../../api.js";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    // using API function to submit data to FoodBuddy API
    LoginUser({
      email: email,
      password: password,
    });
    
    
  }

  return (
    <BoxContainer>
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
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forgot your password?</MutedLink>
      <Marginer direction="vertical" margin="1.5em" />
      <SubmitButton type="submit" onClick={onSubmit}>
        Login
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
