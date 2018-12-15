import React from 'react';
import styled from 'styled-components';
import { IMAGE_URL, IMAGE_BACKCARD } from './constants';

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  margin: 10px;
  transform: ${({ isSelected }) => isSelected ?  `rotateY(180deg)` : 'rotateY(0deg)'};
  transition: all 1s;
  box-shadow: #e6e6e6 3px 2px 6px ;
`;



const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
`;

const StartButton = styled.button`
  width: 150px; 
  height: 50px; 
  border-radius: 4px;
  background-color: #71a9c6;
  color: #fff;
  margin-bottom: 50px; 
`;

const StyledImage = styled.img`
  width: 162px; 
  height: 309px;
`; 

const CardComponent = ({ cards, isStarted, handleStart, handleSelectCard }) => (
  <Container>
    <ButtonContainer>
      <StartButton type="button" onClick={handleStart}>
        Start
      </StartButton>
    </ButtonContainer>
    <CardContainer>
      {cards.map(({ name, image, isSelected }) => 
        <Card key={name} isSelected={isSelected}>
          {isStarted  && !isSelected ? (
            <a href="javascript:void(0);" onClick={() => handleSelectCard(name)}>
              <StyledImage src={IMAGE_BACKCARD} alt={name} />
            </a>
          ) : (
            <StyledImage src={IMAGE_URL + image} alt={name} />
          )}
        </Card>
      )}
    </CardContainer>
  </Container>
);

export default CardComponent;
