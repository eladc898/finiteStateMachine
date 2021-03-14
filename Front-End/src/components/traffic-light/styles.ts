import styled from 'styled-components';

export const WrapperDiv = styled.div`
  text-align: center;
`;

export const TrafficLight = styled.div`
  height: 200px;
  width: 50px;
  border: 1px solid black;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const TrafficLightState = styled.div<{ active: boolean }>`
  height: 40px;
  width: 40px;
  border: 1px solid black;
  border-radius: 50%;
  margin: 0 auto;
  background-color: ${props => props.active ? props.theme : 'white'};
`;

export const EventButton = styled.button<{ inProcess: boolean }>`
  width: 120px;
  margin: 10px 0;
  background-color: lightblue;
  opacity: ${props => props.inProcess ? '0.5' : '1'};
  pointer-events: ${props => props.inProcess ? 'none' : 'auto'};
`;
