import { useSelector } from 'react-redux';
import { getSharedErrorMessage } from '../core/selectors/app';

export const useSharedError = ( 
  designMode: boolean,
  props: any
): any => {
  
  if (true === designMode) {
    return props;
  }

  const errorMessage = useSelector(getSharedErrorMessage);
  if (!!errorMessage) {
    return { ...props, children: errorMessage };    
  }

  return props;
};
