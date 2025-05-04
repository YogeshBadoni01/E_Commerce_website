import { Modal } from "@mui/material";
import React from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import Sign from "../utils/Images/AuthImage.png";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: ${(theme) => theme.bg};
`;
const Right = styled.div`
  flex: 0.9;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  background: yellow;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;

const Left = styled.div`
  flex: 1;
  position: relative;
  background: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Logo = styled.img`
  height: 34px;
  position: absolute;
  top: 50px;
  left: 50px;
  order:1
`

const Image = styled.img`
  position: relative;
  width:100%;
  object-fit:cover;
  order:-1;
  height:100%
`

const CloseButton = styled.div`
position:absolute;
top:20px;
right:20px;
border-radius:50%;
padding:2px;
width:32px;
height:32px;
border:1px solid ${({ theme }) => theme.primary};
display:flex;
align-items:center;
justify-content:center;
    &hover: {
    background:${({ theme }) => theme.primary + 20}
    }
`;

const Text = styled.div`
display:flex;
gap:12px;
font-size:16px;
text-algin:center;
color:${({theme})=> theme.text_secondary};
margin-top:16px;
@media (max-width:400px){
font-size:14px;
}
`
const TextButton = styled.div`
    color:${({theme}) => theme.primary};
    cursor:pointer;
    transition: all 0.3 ease;
    font-weight:600;
`

const Authendication = ({ openAuth, setOpenAuth }) => {

    const [login,setLogin] = useState(true)
  return (
    
    
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
    
      <Container>
        <Left>
          <Logo src={LogoImg} />
          <Image src={Sign} />
        </Left>
        <Right>
          <CloseButton>
            <Close onClick={() => setOpenAuth(false)}>X</Close>
          </CloseButton>

            {
                login ?
                <>
                    <SignIn />
                    <Text>
                        {" "}
                        Don't have an account ?
                         <TextButton onClick={() => setLogin(false)}>Sign Up</TextButton>
                        </Text>
                </>
                :
                <>
                    <SignUp/>
                    <Text>
                        {" "}
                        Already have an account ? <TextButton onClick={() => setLogin(true)}>Sign In</TextButton>
                    </Text>
                </>
            }
        </Right>
      </Container>
    </Modal>
  );
};

export default Authendication;
