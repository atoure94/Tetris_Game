import styled from 'styled-components';

const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-size: 1.3rem;
  font-weight: 500;
  outline: none;
  cursor: pointer;
`;

function StartButton({ callback }) {
  return <StyledButton onClick={callback}>START GAME</StyledButton>;
}

export default StartButton;
