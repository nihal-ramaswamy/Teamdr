import React from "react";
import styled from "styled-components";

export const Grid = styled.div`
  min-height: 250px;


  padding: 15px 10px;

  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;

`;

export const GridImage = styled.div`
  height:170px;
  width:170px;
  border: 1px solid black;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  margin:5px;
  position:relative;
  background-color:white;
  background-image: ${(props) => `url(${props.src})`};

  @media screen and (max-width:1024px) {
      height: 90px;
      width: 90px;
  }
`;

const GridItemWrapper = styled.div`

`;

export const GridItem = ({ forwardedRef, ...props }) => (
  <GridItemWrapper ref={forwardedRef} {...props} />
);
