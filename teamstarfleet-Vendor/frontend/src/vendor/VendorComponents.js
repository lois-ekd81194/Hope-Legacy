import styled from "styled-components";

export const VendorHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: #a8a8a8;
  padding-left: 2%;
  font-weight: bold;
  font-size: 22px;
  padding-top: 8px;
`;

export const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  height: 40px;
  width: 100%;
  border: 2.5px solid black;
  border-radius: 15px;
  padding: 0px 10px;
  /* border-bottom: 1.4px solid transparent; */
  outline: none;
  transition: all 150ms ease-in-out;
  font-size: 12px;
`;

export const BoxContainer = styled.div`
  width: 350px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  height: 300px;
  margin-top: 60px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19); */
  /* border: px solid rgba(200, 200, 200, 0.3); */
`;

export const SubmitButton = styled.button`
  margin: auto;
  text-align: center;
  width: 50%;
  padding: 11px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms, ease-in-out;
  outline: none;
  background: #99ff33;

  &:hover {
    filter: brightness(1.05);
  }

  &:active {
    background: #7fff00;
  }
`;
