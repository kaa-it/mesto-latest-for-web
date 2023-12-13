import { MESTO_SERVER } from "./constants";
import { TCardData, TUserData } from "./types";
//import {getResponse} from './utils';

type TMestoApiConfig = {
  address: string;
  token: string;
  groupId: string;
};

export const getResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class MestoApi {
  _address: string;
  _token: string;
  _groupId: string;

  constructor({ address, token, groupId }: TMestoApiConfig) {
    this._token = token;
    this._groupId = groupId;
    this._address = address;
  }

  getCardList(): Promise<TCardData[]> {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(getResponse<TCardData[]>);
  }

  addCard({
    name,
    link,
  }: Pick<TCardData, "name" | "link">): Promise<TCardData> {
    return fetch(`${this._address}/${this._groupId}/cards/`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(getResponse<TCardData>);
  }

  removeCard(cardID: string): Promise<TCardData> {
    return fetch(`${this._address}/${this._groupId}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(getResponse<TCardData>);
  }

  getUserInfo(): Promise<TUserData> {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(getResponse<TUserData>);
  }

  setUserInfo({
    name,
    about,
  }: Pick<TUserData, "name" | "about">): Promise<TUserData> {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(getResponse<TUserData>);
  }

  setUserAvatar({ avatar }: Pick<TUserData, "avatar">): Promise<TUserData> {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(getResponse<TUserData>);
  }

  changeLikeCardStatus(cardID: string, like: boolean): Promise<TCardData> {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardID}`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(getResponse<TCardData>);
  }
}

const api = new MestoApi(MESTO_SERVER);

export default api;
