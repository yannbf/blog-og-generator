import React from 'react';
import styled from 'styled-components';
import { Logo } from './logo';
import { NoiseRings } from './noise-rings';

const Background = styled(NoiseRings)`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: black;
`;

const Card = styled.div`
  width: 1200px;
  height: 630px;
  overflow: hidden;
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  position: relative;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: #fff;
  width: 570px;
  margin: 0;
`;

const UserImage = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 100%;
  margin-bottom: 34px;
`;

const Username = styled.div`
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.17px;
  text-align: center;
  color: #fff;
`;

const User = ({ image, username }) => (
  <div>
    <UserImage src={image} />
    <Username>{username}</Username>
  </div>
);

const StyledLogo = styled(Logo)`
  position: absolute;
  left: 64px;
  bottom: 36px;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-left: 64px;
  padding-right: 126px;
  margin-top: 155px;
  margin-bottom: 125px;
`;

export const ShoutOut = ({ image, username, message }) => (
  <Card>
    <Background width={1200} height={630} strokeWidth={2} seed={message} />
    <Message>
      <Title>{message}</Title>
      <User image={image} username={username} />
    </Message>
    <StyledLogo />
  </Card>
);
