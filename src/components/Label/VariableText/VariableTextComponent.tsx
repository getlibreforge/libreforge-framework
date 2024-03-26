import { Text } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { cleanupCustomComponentProps } from '../../../utils/CustomPropsMapper';
import { useSelector } from 'react-redux';
import { getCurrentPageState } from '../../../core/selectors/app';
import { getExpressionVariableName, replaceVariable } from '../../../utils/ExpressionUtils';

const VariableTextComponent = forwardRef((props: { componentId: string, children: string, 
    overridenComponentPageState: any, designMode: boolean }, ref) => {
  
  let currentPageState = useSelector(getCurrentPageState);
  /* Override page state in case ${overridenComponentPageState} is provided.
   * This approach used in forEach component to narrow scope to iterating ${row}
   */
  if (!!props.overridenComponentPageState) {
    currentPageState = props.overridenComponentPageState;
  }    

  let targetText = undefined;

  if (true === props.designMode) {
    targetText = props.children;
  } else {
    const variable = getExpressionVariableName(props.children);
    targetText = replaceVariable(props.children, variable, currentPageState[variable]);
  }

  const elementProps = cleanupCustomComponentProps(props);

  return (
    <Text ref={ref} {...elementProps}>
      {targetText}
    </Text>
  );
});

export default VariableTextComponent;
