import accountApi from './accountApi';
import bcnApi from './bcnApi';
import contractApi from './contractApi';
import dnaApi from './dnaApi';
import flipApi from './flipApi';
import ipfsApi from './ipfsApi';
import netApi from './netApi';

const apis = [
  bcnApi,
  flipApi,
  netApi,
  ipfsApi,
  dnaApi,
  contractApi,
  accountApi,
];

export default apis;
