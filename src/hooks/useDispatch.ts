import { useDispatch as useReduxDispatch } from 'react-redux';
import { RematchDispatch } from '@rematch/core';

export const useDispatch = () => {
  return useReduxDispatch() as RematchDispatch<any>;
};
