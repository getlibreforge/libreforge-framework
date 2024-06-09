import { useSelector } from 'react-redux';
import { getLastApplicationEvent } from '../core/selectors/app';

export const useLastApplicationEvent = (
  designMode: boolean
): { type: 'APP_LOADED' | 'VALUE_CHANGED', timespamp: number } | undefined => {
  
  /* Skip shared state in case we are in design mode */
  if (true === designMode) {
    return undefined;
  }

  const lastEvent = useSelector(getLastApplicationEvent);
  return lastEvent;
};
