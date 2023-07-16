import styled from "styled-components";


 export const headerTextStyles = { 
    display: "flex", 
    color: 'white',
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40
  }
  
export const returnStyle = {
    position: "relative",
    left:"5",
    fontSize: 40
  
  }
export const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
export const EditButton = styled.button`
    font: inherit;
    cursor: pointer;
    color: white;
    font-weight: bold;
    background-color: rgb(241, 196, 70);
    padding: 10px 30px;
    text-align: center;
    border: 0px solid #77002e;
    margin: 10px 10px;
    margin-left: 40px;
    margin-right: 25px;
    transition: ease background-color 250ms;
    &:hover {
      background-color: grey;
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
    
  `;
export const LogOffBtn = styled(EditButton)`
  background-color: #D52B2B;
  `;
export const ListContainer = styled.li`
    display: flex;
    cursor: pointer;
    height:55px;
    background-color: white;
    border: 1px solid lightgrey;
    font-size: 25px;
    display: flex;
    font-family: Helvetica Neue;
    align-items: center;
    &:hover {
      background-color: transparent;
      font-color: lightgrey;
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;

export const Btn = styled.button`
  cursor: pointer;
  font: inherit;
  width: 40%;
  height: 60px;
  font-size: 1.3rem;
  color: white;
  border-radius: 25px;
  border:0px;
  background: linear-gradient(90deg, #F8CB19 60%, #FADD6B 100%);
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
  font-weight: bold;
  transition: ease background-color 250ms;
  &:hover {
    background-color: transparent;
    font-color: lightgrey;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
  `;
  export const Btn_v = styled(Btn)`
  background: linear-gradient(90deg, #798698, #DFDBDB);
  `;  
export const Linke = styled.a`
   text-decoration: none
`;