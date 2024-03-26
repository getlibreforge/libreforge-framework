import { useSelector } from 'react-redux';
import { getCurrentPageState } from '../core/selectors/app';

export const usePageStateValueByComponentRef = (
  componentName: string,
  overridenComponentPageState?: any
): { value?: any } => {
  
  let currentPageState = useSelector(getCurrentPageState);

  /* Override page state in case ${overridenComponentPageState} is provided.
  * This approach used in forEach component to narrow scope to iterating ${row}
  */
  if (!!overridenComponentPageState) {
    currentPageState = overridenComponentPageState;
  }

  const valueByName = currentPageState[componentName]
  return !!valueByName ? { value: valueByName }: {};
};