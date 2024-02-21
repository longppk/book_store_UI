import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ButtonStyles = styled.button`
  width: 100%;
  height: auto;
  padding: 10px 20px;
  border-radius: 16px;
  color: #fff;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Button = ({ className, onClick, type, children, to }) => {
  return (
    <NavLink>
      <ButtonStyles className={className} to={to} onClick={onClick} type={type}>
        {children}
      </ButtonStyles>
    </NavLink>
  );
};

export default Button;
