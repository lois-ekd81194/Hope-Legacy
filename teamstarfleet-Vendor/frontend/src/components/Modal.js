import styled from "styled-components";
import {ListContainer, Linke} from "./CustomerStyle";
import Close from '@material-ui/icons/Close';
const ModalStyle = styled.div`
box-shadow: 0 5px 9px rgba(0, 0, 0, 0.5);
border-radius: 6px;
background-color:rgba(0, 0, 0, 0.05);
backdrop-filter: blur(20px);
padding: 2rem 1rem;
width: 20rem;
z-index: 10;
position: fixed;
top: 25vh;
left: calc(50% - 10rem); 
`;
const Text = styled.div`
text-align: center;
font-weight: bold;
font-size: 30px;
`;


export default function Modal(props) {
    function closeHandler() {
      props.onConfirm();
    }
  
    return (
      <ModalStyle>
         <Close onClick={closeHandler}/>
        <Text>Edit Profile</Text>
        <Linke>
        <Linke href = {"/customer/changename"}>
        <ListContainer>
         &ensp;Change Name
        </ListContainer>
        </Linke>
        </Linke>
        <Linke href={"/customer/changepw"}>
        <ListContainer>
         &ensp;Change Password
        </ListContainer>
        </Linke>
      </ModalStyle>
    );
  }
  