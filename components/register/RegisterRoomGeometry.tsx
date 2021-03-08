import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const RegisterRoomGeometryBlock = styled.div`
  padding: 3.875rem 1.875rem 6.25rem;
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
`;

const RegisterRoomGeometry: React.FC = () => {
  return (
    <RegisterRoomGeometryBlock>
      <h2>핀이 놓인 위치가 정확한가요?</h2>
      <h3>Step 4</h3>
      <p>필요한 경우 핀을 이용하여 정확한 위치로 옮길 수 있어요.</p>
    </RegisterRoomGeometryBlock>
  );
};

export default RegisterRoomGeometry;
