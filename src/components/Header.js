import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { login, logout, selectUser } from "../features/user/userSlice";
import { auth, provider } from "../firebase";

const Header = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
        history.push("/");
      }
    });
  }, []);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
        history.push("/");
      })
      .catch((error) => error.message);
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
      history.push("/login");
    });
  };

  return (
    <HeaderNav>
      <Logo src="/images/logo.svg" />

      {!user ? (
        <LoginContainer>
          <Login onClick={signIn}>Log In</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a onClick={() => history.push("/")}>
              <img src="/images/home-icon.svg" alt="" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" alt="" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" alt="" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" alt="" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" alt="" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" alt="" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserProfile src={user.photoUrl} onClick={signOut} />
        </>
      )}
    </HeaderNav>
  );
};

export default Header;

const HeaderNav = styled.nav`
  height: 70px;
  /* position: fixed; */
  background-color: #090b13;
  display: flex;

  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
  z-index: 1;
`;

const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Login = styled.a`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  }

  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const UserProfile = styled(Avatar)`
  cursor: pointer;
`;
