import { useSelector } from 'react-redux';
import { getGlobalLoaderEnabled } from '../core/selectors/app';

export const useGlobalLoaderEnabled = (
  designMode: boolean,
  props: any
): any => {
  
  /* Skip shared state in case we are in design mode */
  if (true === designMode) {
    return props;
  }

  const globalLoaderEnabled = useSelector(getGlobalLoaderEnabled);
  return { ...props, display: (true === globalLoaderEnabled ? 'block': 'none') };
};
