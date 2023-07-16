import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "./marginer.jsx";
import { AccountContext } from "./accountContext";
import { signupUser } from "../../api.js";
import { Redirect } from "react-router-dom";

export function SignupForm(props) {
  const { switchToLogin } = useContext(AccountContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function onSubmit() {
    // using API function to submit data to FoodBuddy API
    signupUser({
      email: email,
      password: password,
      password2: password2,
    });

    // redirect to homepage
    const state = { redirect: "/" };
    return <Redirect to={state.redirect} />;
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
        <Input
          type="password"
          name="password2"
          id="password2"
          value={password2}
          placeholder="Confirm password"
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
        />
      </FormContainer>
      <Marginer direction="vertical" margin="1.5em" />
      <SubmitButton type="submit" onClick={onSubmit}>
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?{" "}
        <BoldLink href="#" onClick={switchToLogin}>
          Login
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
