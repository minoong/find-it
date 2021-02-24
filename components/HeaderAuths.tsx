import React from 'react';
import { useDispatch } from 'react-redux';
import useModal from '../hooks/useModal';
import { authActions } from '../store/auth';
import AuthModal from './auth/AuthModal';

const HeaderAuths: React.FC = () => {
  const { openModal, ModalPortal, closeModal } = useModal();
  const dispatch = useDispatch();
  return (
    <>
      <div className="header-auth-buttons">
        <button
          type="button"
          className="header-sign-up-button"
          onClick={() => {
            dispatch(authActions.setAuthMode('signup'));
            openModal();
          }}
        >
          sign
        </button>
        <button
          type="button"
          className="header-login-button"
          onClick={() => {
            dispatch(authActions.setAuthMode('login'));
            openModal();
          }}
        >
          login
        </button>
      </div>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default HeaderAuths;
