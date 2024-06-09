import { useSelector } from 'react-redux';
import { getCurrentPageState } from '../core/selectors/app';
import { variableNameHidden } from '../utils/NameUtils';

export const useHiddenByComponentRef = (
  componentName: string,
  overridenComponentPageState?: any
): { display?: string } => {
  
  let currentPageState = useSelector(getCurrentPageState);

  /* Override page state in case ${overridenComponentPageState} is provided.
  * This approach used in forEach component to narrow scope to iterating ${row}
  */
  if (!!overridenComponentPageState) {
    currentPageState = overridenComponentPageState;
  }

  const valueByName = currentPageState[variableNameHidden(componentName)]
  return !!valueByName ? { display: 'none' }: {};
};