import { ReactElement, forwardRef, memo, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { getCurrentPageState, getLastApplicationEvent, getLastBusinessRulesExecutionTime, getSharedState } from '../../../core';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../../hooks';
import { cleanupCustomComponentProps } from '../../../utils/CustomPropsMapper';
import { InversifyContainerProviderContext } from '../../../utils';
import { IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import { TbScript } from 'react-icons/tb';
import DynamicScriptExecutor from '../../../utils/DynamicScriptExecutor';

const BusinessRulesComponent = forwardRef((props: { componentId: string, 
  designMode: boolean, pageComponents: IComponents, pages: IPages,
  wrapperComponent?: ReactElement, wrapperContainer?: ReactElement }, ref) => {

  const dispatch = useDispatch();
  const currentPageState = useSelector(getCurrentPageState);
  const sharedState = useSelector(getSharedState);
  const container = useContext(InversifyContainerProviderContext);
  const rules = props.pageComponents[props.componentId].rules;
  const lastBusinessRulesExecutionTime = useSelector(getLastBusinessRulesExecutionTime);
  const lastApplicationEvent = useSelector(getLastApplicationEvent);
  const lastApplicationEventExecutionTime = lastApplicationEvent?.timespamp || -1;
  const lastApplicationEventType = lastApplicationEvent?.type;

  if (true === props.designMode) {
    /* Do nothing */
  } else {
    /* Check there is the application event after the last rules execution */
    if (lastBusinessRulesExecutionTime < lastApplicationEventExecutionTime
        && lastApplicationEventType === 'VALUE_CHANGED') {

          /* Execute Business Rules */          
          const ruleNames = Object.keys(rules);
          for (let i=0; i < ruleNames.length; i++) {
            const businessRule = rules[ruleNames[i]];
            new DynamicScriptExecutor().execute(businessRule.script, dispatch, currentPageState, sharedState, container);
          }

          dispatch.app.setLastBusinessRulesExecutionTime({ timespamp: new Date().getTime() });
        } else {
          console.warn(`Event ${lastApplicationEventType} / ${lastApplicationEventExecutionTime} doesn't trigger the Business Rules Engine`)
        }
  }
  
  if (true === props.designMode) {
    const cleanedProps = cleanupCustomComponentProps({ ...props, ref });

    return (
      //@ts-ignore
      <Box {...cleanedProps}>
        <TbScript size="28" />
      </Box>
    );
  } else {
    return <></>;    
  }
});

export default memo(BusinessRulesComponent);
