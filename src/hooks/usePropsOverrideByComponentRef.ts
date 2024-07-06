import { useSelector } from 'react-redux';
import { getCurrentPageState } from '../core/selectors/app';
import { variableNamePropsOverride } from '../utils/NameUtils';

export const usePropsOverrideByComponentRef = (
  componentName: string,
  originalProps: any,
  designMode: boolean,  
  overridenComponentPageState?: any
): { display?: string } => {
  
  if (true === designMode) {
    return originalProps;
  }

  let currentPageState = useSelector(getCurrentPageState);

  /* Override page state in case ${overridenComponentPageState} is provided.
  * This approach used in forEach component to narrow scope to iterating ${row}
  */
  if (!!overridenComponentPageState) {
    currentPageState = overridenComponentPageState;
  }

  const valueByName = currentPageState[variableNamePropsOverride(componentName)] || {};
  return !!valueByName ? { ...originalProps, ...valueByName }: originalProps;
};