import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import shema from '../schema';
import globals from '../globals';
import wretch from 'wretch';

const StyledWrapper = styled.div``;

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

export default function Contracts({ onResponse }) {
  const [state, setState] = useState({
    contract: '',
    method: '',
    params: {},
    args: [],
  });

  const selectedContract = shema.contracts.find(
    (x) => x.name === state.contract
  );

  const selectedMethod =
    selectedContract &&
    selectedContract.methods.find((x) => x.name === state.method);

  useEffect(() => {
    if (selectedMethod && selectedMethod.args)
      setState({
        ...state,
        args: new Array(selectedMethod.args.length).fill(null),
      });
  }, [selectedMethod]);

  const prepareParams = () => {
    function toHex(str) {
      var result = '0x';
      for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
      }
      return result;
    }

    const extractParamValue = function(value, type) {
      if (type === 'int') return parseInt(value);
      if (type === 'float') return parseFloat(value);
      if (type === 'json') return JSON.parse(value);
      if (type === 'jsonToHex') return toHex(value);
      return value;
    };

    const p = [];
    const obj = {};
    if (selectedMethod && selectedMethod.params) {
      for (const parameter of selectedMethod.params) {
        if (state.params[parameter.name]) {
          obj[parameter.name] = extractParamValue(
            state.params[parameter.name],
            parameter.type
          );
        } else if (parameter.defaultValue) {
          obj[parameter.name] = extractParamValue(
            parameter.defaultValue,
            parameter.type
          );
        }
      }
    }

    if (selectedMethod && selectedMethod.args) {
      obj.args = selectedMethod.args.map((a, idx) => {
        return {
          index: idx,
          format: a.format,
          value: extractParamValue(state.args[idx] || a.defaultValue, a.type),
        };
      });
    }

    p.push(obj);
    return p;
  };

  const changeParamsValue = (e) => {
    const params = state.params;
    params[e.target.name] = e.target.value;
    setState({
      ...state,
      params,
    });
  };

  const changeArgsValue = (e, idx) => {
    const args = state.args;
    args[idx] = e.target.value;
    setState({
      ...state,
      args,
    });
  };

  const call = async (method) => {
    const params = prepareParams();
    const request = {
      method,
      params,
      id: globals.id++,
      key: globals.apikey,
    };
    const start = new Date();
    const response = await wretch(globals.host)
      .post(request)
      .json()
      .catch((error) => {
        console.log(error);
      });
    const end = new Date();

    const output = {
      start: start,
      end: end,
      request: request,
      response: response,
    };

    onResponse(output);
  };

  const estimate = async () => {
    await call(
      `contract_estimate${selectedMethod.name
        .substr(0, 1)
        .toUpperCase()}${selectedMethod.name.substr(1)}`
    );
  };

  const send = async () => {
    await call(`contract_${selectedMethod.name}`);
  };

  return (
    <StyledWrapper>
      <StyledBody>
        <StyledParameter>
          <div className="label">Contract</div>
          <select
            onChange={(e) => setState({ ...state, contract: e.target.value })}
          >
            <option value="">Pick a cotract...</option>
            {shema.contracts.map((contract) => (
              <option value={contract.name}>{contract.name}</option>
            ))}
          </select>
        </StyledParameter>
        <StyledParameter>
          <div className="label">Method</div>
          <select
            onChange={(e) => setState({ ...state, method: e.target.value })}
          >
            <option value="">Select method...</option>
            {selectedContract &&
              selectedContract.methods.map((method) => (
                <option value={method.name}>{method.name}</option>
              ))}
          </select>
        </StyledParameter>
        {selectedMethod && (
          <>
            <StyledBody
              style={{
                borderTop: '1px solid #ccc',
                fontWeight: 'bold',
              }}
            >
              Params
            </StyledBody>
            {selectedMethod.params &&
              selectedMethod.params.map((item) => {
                return item.hidden ? null : (
                  <StyledParameter key={item.name}>
                    <div className="label">{item.title}</div>
                    {item.inputType === 'select' ? (
                      <select
                        name={item.name}
                        onChange={changeParamsValue}
                        value={state.params[item.name] || item.values[0].value}
                      >
                        {item.values.map((v) => {
                          return <option value={v.value}>{v.title}</option>;
                        })}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={item.name}
                        value={state.params[item.name] || ''}
                        onChange={changeParamsValue}
                      />
                    )}
                    {item.required ? (
                      <div className="required">&nbsp;*required</div>
                    ) : null}
                  </StyledParameter>
                );
              })}

            <StyledBody
              style={{
                borderTop: '1px solid #ccc',
                fontWeight: 'bold',
              }}
            >
              Args
            </StyledBody>

            {selectedMethod.args &&
              selectedMethod.args.map((item, idx) => {
                return item.hidden ? null : (
                  <StyledParameter key={item.idx}>
                    <div className="label">{item.title}</div>
                    {item.inputType === 'select' ? (
                      <select
                        name={item.name}
                        onChange={(e) => changeArgsValue(e, idx)}
                        value={state.args[idx] || item.values[0].value}
                      >
                        {item.values.map((v) => {
                          return <option value={v.value}>{v.title}</option>;
                        })}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={item.name}
                        value={state.args[idx] || item.defaultValue}
                        onChange={(e) => changeArgsValue(e, idx)}
                        placeholder={item.placeholder}
                      />
                    )}
                    {item.required ? (
                      <div className="required">&nbsp;*required</div>
                    ) : null}
                  </StyledParameter>
                );
              })}
            <StyledParameter key={'actions'}>
              <div className="label"></div>
              <button onClick={estimate} style={{ marginRight: 10 }}>
                Estimate
              </button>
              <button onClick={send}>Send</button>
            </StyledParameter>
          </>
        )}
      </StyledBody>
    </StyledWrapper>
  );
}
