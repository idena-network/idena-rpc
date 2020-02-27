import React, { Component } from 'react';
import styled from 'styled-components';
import globals from '../globals';

const StyledHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 0 20px;

  > div {
    margin-right: 10px;
    display: flex;
  }
`;

const StyledCaption = styled.div`
  font-size: 18px;
  margin-right: 10px;
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      host: globals.host,
      apikey: '',
      changing: false
    };
  }

  apply() {
    const state = this.state;
    state.changing = false;
    globals.host = state.host;
    globals.apikey = state.apikey;
    this.setState(state);
  }

  change() {
    const state = this.state;
    state.changing = true;
    this.setState(state);
  }

  changeHost(e) {
    const state = this.state;
    state.host = e.target.value;
    this.setState(state);
  }

  changeApikey(e) {
    const state = this.state;
    state.apikey = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <StyledHeader>
        <div>
          <StyledCaption>Idena node connection</StyledCaption>
          <div>
            <input
              value={this.state.host}
              onChange={this.changeHost.bind(this)}
              disabled={!this.state.changing}
            />
            <input
              value={this.state.apikey}
              onChange={this.changeApikey.bind(this)}
              disabled={!this.state.changing}
              placeholder="enter api-key"
            />
            {this.state.changing ? (
              <button onClick={() => this.apply()}>Apply</button>
            ) : (
              <button onClick={() => this.change()}>Change</button>
            )}
          </div>
        </div>
      </StyledHeader>
    );
  }
}

export default Header;
