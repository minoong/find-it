/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';
import HeaderAuths from './HeaderAuths';
import palette from '../styles/palette';
import AuthModal from './auth/AuthModal';
import useModal from '../hooks/useModal';
import { useSelector } from '../store';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';
import { authActions } from '../store/auth';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from '../store/user';
import HeaderUserProfile from './HeaderUserProfile';

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
      font-size: 1.75rem;
      margin-right: 0.375rem;
      font-weight: bold;
      transition: all 0.3s;
      &:hover {
        color: ${palette.orange};
      }
    }
  }

  .header-logo-wrapper + div {
    position: relative;
  }

  .header-usermenu {
    position: absolute;
    right: 0;
    top: 3.25rem;
    width: 10rem;
    padding: 0.5rem 0;
    box-shadow: 0 2px 1rem rgba(0, 0, 0, 0.12);
    border-radius: 0.5rem;
    background-color: white;
    li {
      font-size: 0.5rem;
      display: flex;
      align-items: center;
      width: 100%;
      line-height: 2.5;
      padding: 0 1rem;
      cursor: pointer;
      transition: all 0.1s ease-out;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 0.5rem 0;
      background-color: ${palette.gray_dd};
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

  .header-user-profile {
    display: flex;
    align-items: center;
    height: 2.625rem;
    padding: 0 0.375rem 0 1rem;
    border: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 1.3125rem;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 0.5rem;
      width: 1.875rem;
      height: 1.875rem;
      border-radius: 50%;
    }
  }

  @media (max-width: 1024px) {
    margin: 0 auto;
    width: 768px;
  }
`;

const Header: React.FC = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <HeaderBlock>
        <Link href="/">
          <a className="header-logo-wrapper">
            <span className="header-logo">find-it</span>
          </a>
        </Link>
        {!user.isLogged && <HeaderAuths />}
        {user.isLogged && <HeaderUserProfile />}
      </HeaderBlock>
    </>
  );
};

export default Header;
