import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const StepBlock = styled.div`
  h2 {
    font-size: 1.1875rem;
    font-weight: bold;
    margin-bottom: 3.5rem;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 0.375rem;
  }
  .register-room-step-info {
    font-size: 0.875rem;
    max-width: 27rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

interface IProps {
  title: string;
  step: number;
  children?: React.ReactNode;
}

const Step: React.FC<IProps> = ({ title, step, children }) => {
  return (
    <StepBlock>
      <h2>{title}</h2>
      <h3>Step {step}</h3>
      <p className="register-room-step-info">{children}</p>
    </StepBlock>
  );
};

export default Step;
