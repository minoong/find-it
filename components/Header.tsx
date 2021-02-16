/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import palette from '../styles/palette';
import SignUpModal from './auth/SignUpModal';
import useModal from '../hooks/useModal';
import user from '../lib/data/user';
import { useSelector } from '../store';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';

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
  const { openModal, ModalPortal, closeModal } = useModal();
  const user = useSelector((state) => state.user);
  return (
    <>
      <HeaderBlock>
        <Link href="/">
          <a className="header-logo-wrapper">
            <span className="header-logo">find-it</span>
          </a>
        </Link>
        {!user.isLogged && (
          <div className="header-auth-buttons">
            <button type="button" className="header-sign-up-button" onClick={openModal}>
              sign
            </button>
            <button type="button" className="header-login-button">
              login
            </button>
          </div>
        )}
        {user.isLogged && (
          <button className="header-user-profile" type="button">
            <HamburgerIcon />
            <img src={user.profileImage} className="header-user-profile-image" alt="" />
          </button>
        )}
        <ModalPortal>
          <SignUpModal closeModal={closeModal} />
        </ModalPortal>
      </HeaderBlock>
    </>
  );
};

export default Header;
