import {LOGIN, USER_DATA, USER_IMAGE, USER_TOKEN} from '../type';

export function loginUserSuccess(payload) {
  return {
    type: USER_DATA,
    payload: payload,
  };
}

export function userTokenSuccess(payload) {
  return {
    type: USER_TOKEN,
    payload: payload,
  };
}

export function registerUserSuccess(payload) {
  return {
    type: USER_DATA,
    payload: payload,
  };
}

export function fetchUserInfoSuccess(payload) {
  return {
    type: USER_DATA,
    payload: payload,
  };
}

export function updateLoginCount(payload) {
  return {
    type: LOGIN,
    payload: payload,
  };
}

export function updateImage(payload) {
  return {
    type: USER_IMAGE,
    payload: payload,
  };
}
