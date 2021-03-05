import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

interface StyledButtonProps {}

const getButtonColor = (color: string) => {
  return css`
    background-color: ${palette[color]};
  `;
};

const normalButtonStyle = css`
  width: 100%;
  height: 3rem;
  padding: 0 0.9375rem;
  border: 0;
  border-radius: 0.25rem;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 1rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;

  transition: all 0.3s;

  :hover {
    background-color: ${palette.davidson_orange};
  }
`;

const registerButtonStyle = css`
  width: 10.0625rem;
  height: 2.8125rem;
  border: 1px solid ${palette.gray_c4};
  background-color: white;
  border-radius: 0.25rem;
  color: ${palette.gray_48};
  font-size: 1.125rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;

  transition: all 0.3s;

  :hover {
    background-color: ${palette.gray_f7};
  }
`;

const ButtonBlock = styled.button<{ styleType: 'normal' | 'register' }>`
  ${({ styleType }) => (styleType === 'register' ? registerButtonStyle : normalButtonStyle)}
  ${(props) => getButtonColor(props.color || '')}
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'dark_cyan' | 'white';
  styleType?: 'normal' | 'register';
}

const Button: React.FC<IProps> = ({ children, color, styleType = 'normal', ...props }) => {
  return (
    <ButtonBlock {...props} color={color} styleType={styleType}>
      {children}
    </ButtonBlock>
  );
};

export default React.memo(Button);
