import React from 'react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '../store/store';

const userAuthAction = () => {
  const setAuth = useSetRecoilState(authAtom);

  // const login = (username, password) => {
  //   return
  // };
  // return {
  //   login,
  //   logout,
  //   getAll,
  // };
};

export default userAuthAction;
