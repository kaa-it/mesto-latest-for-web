import {AUTH_SERVER_URL} from './constants';
import {getResponse} from './utils';
import {TAuthData, TAuthToken} from "./types";

export const register = (email: string, password: string): Promise<TAuthData> => {
  return fetch(`${AUTH_SERVER_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(getResponse<TAuthData>)
};

export const login = (email: string, password: string): Promise<TAuthToken> => {
  return fetch(`${AUTH_SERVER_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(getResponse<TAuthToken>)
};

export const checkToken = (token: string): Promise<{data: TAuthData}> => {
  return fetch(`${AUTH_SERVER_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponse<{data: TAuthData}>)
}