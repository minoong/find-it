import React from 'react';
import styled from 'styled-components';

const SignUpModalBlock = styled.div`
  width: 35.5rem;
  height: 38.375rem;
  background-color: white;
  z-index: 11;
`;

const SignUpModal: React.FC = () => {
  return <SignUpModalBlock>Sign Up</SignUpModalBlock>;
};

export default SignUpModal;
