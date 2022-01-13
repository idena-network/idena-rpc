import React, { Component } from "react";
import JSONPretty from "react-json-pretty";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin-bottom: 10px;
`;

class Output extends Component {
  render() {
    return (
      <StyledContainer>
        <div>--------- Duration {+this.props.value.end - +this.props.value.start} ms ---------</div>
        <JSONPretty id="json-pretty" json={this.props.value.request} />
        {this.props.value.response ? (
          <JSONPretty id="json-pretty" json={this.props.value.response} />
        ) : (
          <div>You are not connected to the node or the selected method is not allowed :(</div>
        )}

        <div>-------------------------------------</div>
      </StyledContainer>
    );
  }
}

export default Output;
