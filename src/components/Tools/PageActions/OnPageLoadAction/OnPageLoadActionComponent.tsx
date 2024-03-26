import { ReactElement, forwardRef, memo, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import { getCurrentPageState, getSharedState } from '../../../../core';
import { useSelector } from 'react-redux';
import { useDispatch, usePropBasedActions } from '../../../../hooks';
import { cleanupCustomComponentProps } from '../../../../utils/CustomPropsMapper';
import { VscGithubAction } from "react-icons/vsc";
import { InversifyContainerProviderContext, ProviderFactory } from '../../../../utils';
import { IComponents, IPages } from '@libreforge/libreforge-framework-shared';
import { useNavigate } from 'react-router-dom';
import { ActionExecutionContext } from '../../../../actions';

const OnPageLoadActionComponent = forwardRef((props: { componentId: string, 
  designMode: boolean, pageComponents: IComponents, pages: IPages,
  wrapperComponent?: ReactElement, wrapperContainer?: ReactElement }, ref) => {

  const dispatch = useDispatch();
  const router = useNavigate();
  const snackbar = useSnackbar();
  const currentPageState = useSelector(getCurrentPageState);
  const sharedState = useSelector(getSharedState);
  const container = useContext(InversifyContainerProviderContext);
  const factory = new ProviderFactory(container);
  const propBasedActions = usePropBasedActions(['_x_action'], props);
  const logId = `_action_executed_${props.componentId}`;

  if (true === props.designMode) {
    /* Do nothing */
    
  } else if (!!currentPageState[logId]) {
    console.warn(`Action OnPageLoadActionComponent [id = ${props.componentId}] already executed. Skipping...`)
  } else if (propBasedActions.length > 0) {

    /* Report execution log to prevent redundant execution */
    dispatch.app.changeCurrentPageState({ name: logId, value: 'true'});

    const action = propBasedActions[0].action;
    const args = propBasedActions[0].args;

    const actionExecutionContext: ActionExecutionContext = {
      componentId: props.componentId, args, pageComponents: props.pageComponents,
      currentPageState, sharedState, dispatch, snackbar, router, container, collectionRefIdx: undefined, prevExecutionState: undefined
    }

    action.execute(actionExecutionContext)
    .then(result => {
      if (false === result.next) {
        /* Action execution failed, hence unblock action */
        dispatch.app.changeCurrentPageState({ name: logId, value: undefined});
      }
    }).catch(error => {
      snackbar.error(error);
      dispatch.app.changeCurrentPageState({ name: logId, value: undefined});
    })
  } else {
    console.warn(`No action defined for OnPageLoadActionComponent [id = ${props.componentId}]`);
  }
  
  if (true === props.designMode) {
    const cleanedProps = cleanupCustomComponentProps({ ...props, ref });

    return (
      //@ts-ignore
      <Box {...cleanedProps}>
        <VscGithubAction size="28" />
      </Box>
    );
  } else {
    return <></>;    
  }
});

export default memo(OnPageLoadActionComponent);
