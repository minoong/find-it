import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

interface StyledButtonProps {}

const getButtonColor = (color: string) => {
  return css`
    background-color: ${palette[color]};
  `;
};

const ButtonBlock = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  .space {
    flex: 1;
  }
`;

const CustomButtonBlock = styled.button<StyledButtonProps>`
  width: 100%;
  height: 2rem;
  border: 0;
  border-radius: 0.25rem;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 1rem;
  line-height: 2rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;

  ${(props) => getButtonColor(props.color || '')}

  :hover {
    background-color: ${palette.davidson_orange};
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <ButtonBlock>
      <div className="space" />
      <CustomButtonBlock {...props}>{children}</CustomButtonBlock>
    </ButtonBlock>
  );
};

export default React.memo(Button);
