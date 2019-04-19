import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      text-shadow: 0px 0px 60px #03ff03;
    `}

  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`;

export default class NavBar extends React.Component {
  render() {
    return (
      <Menu fixed="top">
        <Container>
          <Menu.Item header>My Betting App</Menu.Item>
          <Menu.Item name="Bets" />
          <Menu.Item position="right">
            <Button basic content="NBA" />
            <Button basic content="NHL" />
            <Link to="/mlb">NFL</Link>
            <Link to="/mlb">MLB</Link>
            <ControlButtonElem>NFL</ControlButtonElem>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
