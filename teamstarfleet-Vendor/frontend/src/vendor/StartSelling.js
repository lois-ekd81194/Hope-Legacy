import React, {useState} from "react";
import { Marginer } from "../pages/account/marginer";
import { startSelling, usePosition } from "../api.js";
import { Redirect } from "react-router-dom";
import {
  PageContainer,
  VendorHeader,
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "./VendorComponents.js";
import Geocode from "react-geocode";

export function StartSelling(props) {
  const [locationText, setlocationText] = useState("");
  const {position, p_error} = usePosition();

  function onSubmit() {
    // using API function to submit data to FoodBuddy API
    console.log(position);
        startSelling({
          locationText: locationText,
          coords: position
        });
    
        // redirect to homepage
        const state = { redirect: "/" };
        return <Redirect to={state.redirect} />;
      
  }

  return (
    <PageContainer>
      <VendorHeader>Service stopped</VendorHeader>
      <BoxContainer>
        <Marginer direction="vertical" margin="80px" />
        <FormContainer>
          <p>
            Please enter a short location description to display to customers:
          </p>
          <Input
            type="string"
            name="locationText"
            id="locationText"
            value={locationText}
            placeholder="Location"
            onChange={(event) => {
              setlocationText(event.target.value);
            }}
          />
        </FormContainer>
        <Marginer direction="vertical" margin="40px" />
        <SubmitButton type="submit" onClick={onSubmit}>
          Start selling
        </SubmitButton>
      </BoxContainer>
      <Marginer direction="vertical" margin="80px" />
    </PageContainer>
  );
}

export default StartSelling;
