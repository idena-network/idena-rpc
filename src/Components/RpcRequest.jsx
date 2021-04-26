import React, { Component } from 'react';
import wretch from 'wretch';
import styled from 'styled-components';
import globals from '../globals';

const StyledWrapper = styled.div``;

const StyledCaption = styled.div`
  font-size: 20px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    color: #777;
  }
`;

const StyledBody = styled.div`
  padding: 5px;
`;

const StyledParameter = styled.div`
  padding: 5px;
  display: flex;

  .label {
    width: 100px;
  }
  .required {
    color: red;
  }
`;

class RpcRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBody: false,
      params: {}
    };
  }

  sendRequest(request) {
    return wretch(globals.host)
      .post(request)
      .json()
      .catch(error => {
        // error[errorType] (here, json) contains the parsed body
        console.log(error);
      });
  }

  prepareRequest() {
    const extractValue = function (value, type) {
      if (type === 'int') return parseInt(value);
      if (type === 'float') return parseFloat(value);
      if (type === 'json') return JSON.parse(value);
      if (type === 'bool') return !!value
      return value;
    };

    const p = [];
    if (this.props.data.params) {
      if (this.props.data.paramsAsObject) {
        const obj = {};
        for (const parameter of this.props.data.params) {
          if (this.state.params.hasOwnProperty(parameter.name)) {
            obj[parameter.name] = extractValue(
              this.state.params[parameter.name],
              parameter.type
            );
          } else if (parameter.defaultValue) {
            obj[parameter.name] = extractValue(
              parameter.defaultValue,
              parameter.type
            );
          }
        }
        p.push(obj);
      } else {
        for (const parameter of this.props.data.params) {
          if (this.state.params.hasOwnProperty(parameter.name)) {
            p.push(
              extractValue(this.state.params[parameter.name], parameter.type)
            );
          } else if (parameter.defaultValue) {
            p.push(extractValue(parameter.defaultValue, parameter.type));
          } else p.push(null);
        }
      }
    }

    return {
      method: this.props.data.method,
      params: p,
      id: globals.id++,
      key: globals.apikey
    };
  }

  async getResponse() {
    const start = new Date();
    const request = this.prepareRequest();
    const response = await this.sendRequest(request);
    const end = new Date();

    const output = {
      start: start,
      end: end,
      request: request,
      response: response
    };

    this.props.onResponse(output);
  }

  toggleBody() {
    this.setState({
      showBody: !this.state.showBody
    });
  }

  changeValue(e) {
    const params = this.state.params;
    params[e.target.name] = e.target.value;
    this.setState({
      params: params
    });
  }

  changeCheckboxValue(e) {
    const params = this.state.params;
    params[e.target.name] = e.target.checked;
    this.setState({
      params: params
    });
  }

  render() {
    return (
      <StyledWrapper>
        <StyledCaption onClick={() => this.toggleBody()}>
          {this.props.data.title}
        </StyledCaption>
        {this.state.showBody ? (
          <StyledBody>
            {this.props.data.params &&
              this.props.data.params.map(item => {
                return item.hidden ? null : (
                  <StyledParameter key={item.name}>
                    <div className="label">{item.title}</div>
                    {item.inputType === 'select' ? (
                      <select
                        name={item.name}
                        onChange={this.changeValue.bind(this)}
                        value={
                          this.state.params[item.name] || item.values[0].value
                        }
                      >
                        {item.values.map(v => {
                          return <option value={v.value}>{v.title}</option>;
                        })}
                      </select>
                    ) : (
                      item.inputType === "checkbox" ? (<input
                        type="checkbox"
                        name={item.name}
                        value={this.state.params[item.name] || ''}
                        onChange={this.changeCheckboxValue.bind(this)}
                      />) : (
                        <input
                          type="text"
                          name={item.name}
                          value={this.state.params[item.name] || ''}
                          onChange={this.changeValue.bind(this)}
                        />
                      )
                    )}
                    {item.required ? (
                      <div className="required">&nbsp;*required</div>
                    ) : null}
                  </StyledParameter>
                );
              })}
            <button onClick={() => this.getResponse()}>Send request</button>
          </StyledBody>
        ) : null}
      </StyledWrapper>
    );
  }
}

export default RpcRequest;
