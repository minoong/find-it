import Link from 'next/link';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { logoutAPI } from '../lib/api/auth';
import { useSelector } from '../store';
import { userActions } from '../store/user';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';

const HeaderUserProfile: React.FC = () => {
  const [isUserMenuOpend, setIsuserMenuOpend] = useState(false);
  const userProfileImage = useSelector((state) => state.user.profileImage);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUserMenuOpend) setIsuserMenuOpend(false);
      }}
    >
      <button className="header-user-profile" type="button" onClick={() => setIsuserMenuOpend(!isUserMenuOpend)}>
        <HamburgerIcon />
        <img src={userProfileImage} className="header-user-profile-image" alt="" />
      </button>
      {isUserMenuOpend && (
        <ul className="header-usermenu">
          <li>호스텔 관리</li>
          <Link href="/room/register/building">
            <a
              role="presentation"
              onClick={() => {
                setIsuserMenuOpend(false);
              }}
            >
              <li>호스텔 등록</li>
            </a>
          </Link>
          <div className="header-usermenu-divider" />
          <li role="presentation" onClick={logout}>
            로그아웃
          </li>
        </ul>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
