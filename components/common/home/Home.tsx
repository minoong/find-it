import React from 'react';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import SearchRoomBar from './searchRoomBar/SearchRoomBar';

const HomeBlock = styled.div`
  width: 100%;
  padding: 0 5rem;

  .home-search-bar-label {
    margin: 2rem 0 1rem;
    font-weight: 600;
    font-size: 0.875rem;
  }
  h2 {
    width: 34.8125rem;
    margin: 5rem 0 3.75rem;
    font-size: 3.125rem;
    line-height: 1.3;
    color: ${palette.cardinal};
  }
`;

const Home: React.FC = () => {
  return (
    <HomeBlock>
      <div className="home-search-bar-label">
        <SearchRoomBar />
        <h2>가까운 여행지, find-it과 탐험해보세요.</h2>
      </div>
    </HomeBlock>
  );
};

export default Home;
