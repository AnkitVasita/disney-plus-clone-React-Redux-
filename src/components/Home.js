import React, { useEffect } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Movies from "./Movies";
import Viewers from "./Viewers";
import db from "../firebase";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      let temp = snapshot.docs.map((doc) => {
        console.log(doc.data().type);
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      dispatch(setMovies(temp));
      console.log(temp);
    });
  }, [dispatch]);
  return (
    <HomeContainer>
      <ImgSlider />
      <Viewers />
      <Movies />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;

  &:before {
    background: url("images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
