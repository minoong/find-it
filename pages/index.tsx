/* eslint-disable no-use-before-define */
import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const Container = styled.div`
  font-size: 1.3125rem;
  color: gray;
`;

const index: React.FC = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default index;
