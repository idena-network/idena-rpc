import React, { Component } from 'react';
import styled from 'styled-components';
import Output from './Output';
import RpcRequest from './RpcRequest';
import apis from '../schemas/apis';
import Contracts from './Contracts';

const StyledWrapper = styled.div`
  display: flex;
  height: calc(100% - 41px);
  > div {
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    position: relative;

    &:nth-child(1) {
      width: 30%;
    }
    &:nth-child(2) {
      width: 70%;
      border-left: 1px solid #ccc;
    }
  }
`;

const StyledGroup = styled.div`
  border: 1px solid #ccc;
  margin-bottom: 10px;
  > div {
    border-top: 1px solid #ccc;

    &:nth-child(1) {
      border: none;
    }
  }
`;

const SyledGroupHeader = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  padding: 10px;
`;

const StyledClear = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outputs: [],
    };
  }

  addJson(obj) {
    const outputs = this.state.outputs.slice();
    outputs.unshift(obj);
    this.setState({
      outputs: outputs,
    });
  }

  clear() {
    this.setState({
      outputs: [],
    });
  }

  render() {
    return (
      <StyledWrapper>
        <div>
          <StyledGroup key={'contracts'}>
            <SyledGroupHeader>Contracts</SyledGroupHeader>
            <Contracts onResponse={(resp) => this.addJson(resp)} />
          </StyledGroup>
          {apis.map((api) => {
            return (
              <StyledGroup key={api.title}>
                <SyledGroupHeader>{api.title}</SyledGroupHeader>
                {api.endpoints.map((endpoint) => {
                  return (
                    <RpcRequest
                      key={endpoint.method}
                      onResponse={(resp) => this.addJson(resp)}
                      data={endpoint}
                    />
                  );
                })}
              </StyledGroup>
            );
          })}
        </div>
        <div>
          {this.state.outputs.map((item) => {
            return <Output value={item} />;
          })}
          <StyledClear onClick={this.clear.bind(this)}>clear</StyledClear>
        </div>
      </StyledWrapper>
    );
  }
}

export default Board;
