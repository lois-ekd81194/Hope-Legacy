import React, { useState} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LoginForm } from "./loginForm";
import { SignupForm } from "./signupForm";
import { AccountContext } from "./accountContext";
import { Marginer } from "./marginer.jsx";
import { FiUser } from "react-icons/fi";
import { PageContainer } from "./common.jsx";

const TopContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  /* padding: 0 1.8em; */
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  /* width: 300px; */
  height: 100%;
  position: absolute;
  /* display: flex;
  flex-direction: column; */
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 45px;
  padding-left: 1.8em;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 8px;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
  color: black;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "100%",
    height: "800px",
    // borderRadius: "20%",
    // transform: "rotate(60deg)",
  },
  collapsed: {
    width: "100%",
    height: "150px",
    // borderRadius: "50%",
    // transform: "rotate(60deg)",
  },
};

const expandedTransition = {
  type: "spring",
  duration: 1.3,
  stiffness: 30,
};

export function Account(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("login");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandedTransition.duration * 500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToLogin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("login");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToLogin };

  return (
    <AccountContext.Provider value={contextValue}>
      <PageContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandedTransition}
          />
          {active === "login" && (
            <HeaderContainer>
              <HeaderText>Welcome back</HeaderText>
              <SmallText>Please login in to order snacks</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Create account</HeaderText>
              <SmallText>Please signup to continue</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          <FiUser size="120px" color="rgba(200, 200, 200, 1)" />
          <Marginer direction="vertical" margin="20px" />
          {active === "login" && <LoginForm />}
          {active === "signup" && <SignupForm />}
          <Marginer direction="vertical" margin="80px" />
        </InnerContainer>
      </PageContainer>
    </AccountContext.Provider>
  );
}
