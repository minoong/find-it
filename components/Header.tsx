/* eslint-disable no-use-before-define */
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import palette from '../styles/palette';

const HeaderBlock = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${palette.charcoal};
    .header-logo {
      margin-right: 0.375rem;
      font-weight: bold;
      transition: all 0.3s;
      &:hover {
        color: ${palette.orange};
      }
    }
  }
  .header-auth-buttons {
    .header-sign-up-button {
      height: 2.625rem;
      margin-right: 0.5rem;
      padding: 0 1rem;
      border: 0;
      border-radius: 1.3125rem;
      background-color: white;
      cursor: pointer;
      outline: none;
      transition: all 0.3s;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 2.625rem;
      padding: 0 1rem;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 1.3125rem;
      background-color: white;
      cursor: pointer;
      outline: none;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderBlock>
      <Link href="/">
        <a className="header-logo-wrapper">
          <span className="header-logo">find-it</span>
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button type="button" className="header-sign-up-button">
          sign
        </button>
        <button type="button" className="header-login-button">
          login
        </button>
      </div>
    </HeaderBlock>
  );
};

export default Header;
