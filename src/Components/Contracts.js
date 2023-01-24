import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import contracts from '../schemas/contracts';
import globals from '../globals';
import wretch from 'wretch';
import {
  hexToUint8Array,
  int16ToBuffer,
  int32ToBuffer,
  toBuffer,
  toHexString,
} from '../utils';
import sha3 from 'js-sha3';
import InputMask from 'react-input-mask';

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

const StyledCaption = styled.div`
  font-size: 20px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    color: #777;
  }
`;

export default function Contracts({ onResponse }) {
  const [state, setState] = useState({
    argsKey: '',
    contract: '',
    method: '',
    params: {},
    args: [],
  });

  const selectedContract = contracts.find((x) => x.name === state.contract);

  const selectedMethod =
    selectedContract &&
    selectedContract.methods.find((x) => x.name === state.method);

  useEffect(() => {
    if (selectedMethod && selectedMethod.args)
      setState({
        ...state,
        argsKey: selectedContract.name + selectedMethod.name,
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
      if (type === 'int') return parseInt((value || "0").replace(".", ""));
      if (type === 'float') return parseFloat(value || 0);
      if (type === 'json') return JSON.parse(value);
      if (type === 'jsonToHex') return toHex(value);
      return value || null;
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
        const paramValue = extractParamValue(
          state.args[idx] || a.defaultValue,
          a.type
        );
        return {
          index: idx,
          format: a.format,
          value: paramValue === null ? null : paramValue.toString(),
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
      `contract_estimate${selectedMethod.method
        .substr(0, 1)
        .toUpperCase()}${selectedMethod.method.substr(1)}`
    );
  };

  const send = async () => {
    await call(`contract_${selectedMethod.method}`);
  };

  return (
    <>
      <StyledWrapper>
        <StyledBody>
          <StyledParameter>
            <div className="label">Contract</div>
            <select
              onChange={(e) => setState({ ...state, contract: e.target.value })}
            >
              <option value="">Pick a cotract...</option>
              {contracts.map((contract) => (
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
                          value={
                            state.params[item.name] || item.values[0].value
                          }
                        >
                          {item.values.map((v) => {
                            return <option value={v.value}>{v.title}</option>;
                          })}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name={item.name}
                          value={
                            state.params[item.name] || item.defaultValue || ''
                          }
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

              <div key={state.argsKey}>
                {selectedMethod.args &&
                  selectedMethod.args.map((item, idx) => {
                    return item.hidden ? null : (
                      <StyledParameter key={item.title}>
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
                        ) : item.mask ? (
                          <InputMask
                              type="text"
                              name={item.name}
                              value={state.args[idx] || item.defaultValue}
                              onChange={(e) => changeArgsValue(e, idx)}
                              placeholder={item.placeholder}
                              {...item.mask}
                          />
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
              </div>
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
      <PredictAddress onResponse={onResponse} />
    </>
  );
}

const PredictAddress = ({ onResponse }) => {
  const [state, setState] = useState({});
  const [predict, showPredict] = useState(false);

  const getAddress = async () => {
    const request = {
      address: state.address,
      epoch: state.epoch,
      nonce: state.nonce,
    };
    const start = new Date();

    let response = {};
    try {
      const addr = toBuffer(hexToUint8Array(state.address));
      const epoch = int16ToBuffer(parseInt(state.epoch));
      const nonce = int32ToBuffer(parseInt(state.nonce));
      const res = [...addr, ...epoch, ...nonce];
      const hash = sha3.keccak_256.array(res);
      response.address = toHexString(hash.slice(hash.length - 20), true);
    } catch (e) {
      response.error = e.toString();
    }

    const end = new Date();

    const output = {
      start: start,
      end: end,
      request: request,
      response: response,
    };

    onResponse(output);
  };

  return (
    <StyledWrapper>
      <StyledCaption onClick={() => showPredict(!predict)}>
        Get contract address
      </StyledCaption>
      {predict && (
        <StyledBody>
          <StyledParameter key={'address'}>
            <div className="label">Sender</div>
            <input
              type="text"
              name={'address'}
              value={state.address}
              onChange={(e) => setState({ ...state, address: e.target.value })}
            />
            <div className="required">&nbsp;*required</div>
          </StyledParameter>
          <StyledParameter key={'epoch'}>
            <div className="label">Epoch</div>
            <input
              type="text"
              name={'epoch'}
              value={state.epoch}
              onChange={(e) => setState({ ...state, epoch: e.target.value })}
            />
            <div className="required">&nbsp;*required</div>
          </StyledParameter>
          <StyledParameter key={'nonce'}>
            <div className="label">Nonce</div>
            <input
              type="text"
              name={'nonce'}
              value={state.nonce}
              onChange={(e) => setState({ ...state, nonce: e.target.value })}
            />
            <div className="required">&nbsp;*required</div>
          </StyledParameter>
          <button onClick={() => getAddress()}>Get address</button>
        </StyledBody>
      )}
    </StyledWrapper>
  );
};
