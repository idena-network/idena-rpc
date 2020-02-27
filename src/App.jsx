import React, { Component } from 'react';
import Header from './Components/Header';
import Board from './Components/Board';
import styled from 'styled-components';

const StyledApp = styled.div`
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <StyledApp>
        <Header />
        <Board />
      </StyledApp>
    );
  }
}

export default App;
