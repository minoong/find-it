import React from 'react';
import styled from 'styled-components';

const SignUpModalBlock = styled.div`
  width: 35.5rem;
  height: 38.375rem;
  background-color: white;
  padding: 0.5rem;
  z-index: 11;
  transform: scale(0);
  animation: zoomIn 0.2s 0s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

  @keyframes zoomIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;

const SignUpModal: React.FC = () => {
  return <SignUpModalBlock>Sign Up</SignUpModalBlock>;
};

export default SignUpModal;
