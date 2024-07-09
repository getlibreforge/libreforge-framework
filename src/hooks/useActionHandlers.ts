import { MouseEvent, useContext } from 'react';
import { useSelector } from 'react-redux';

import {
  getCurrentPageState, getSharedState,
} from '../core/selectors/app';

import { useDispatch } from '../hooks/useDispatch';
import { InversifyContainerProviderContext } from '../utils/inversify';
import { ProviderFactory } from '../utils/ProviderFactory';
import { useSnackbar } from '../hooks/useSnackbar';
import { useNavigate } from "react-router-dom";
import { useActions } from './useActions';
import { ActionExecutionContext } from '../actions';
import { IActionGroup } from '@libreforge/libreforge-framework-shared';

export const useActionHandlers = (props: any, actionGroup: IActionGroup, page: number = 0, size: number = 10) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const snackbar = useSnackbar();
  const currentPageState = useSelector(getCurrentPageState);
  const sharedState = useSelector(getSharedState);
  const container = useContext(InversifyContainerProviderContext);
  const factory = new ProviderFactory(container);

  const pagination = { page, size };

  let targetProps = { ...props };
  const { _x_onchange, pageComponents, designMode, collectionRefIdx } = targetProps;
  const actions = useActions(actionGroup, props);
  console.log('Actions');
  console.log(actions);

  if (false === designMode) {

    const onChangeHandler = factory.getValueChangeHandlerByName(_x_onchange);

    targetProps = {
      ...props,
      onClick: async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        /* Enable loader, TODO: improve */
        await dispatch.app.setGlobalLoaderEnabled({});

        let lastActionResult = { next: true, result: undefined }
        for (let i=0; i<actions.length; i++) {
          const item = actions[i];
          if (!!item.action && true === lastActionResult.next) {

            const actionExecutionContext: ActionExecutionContext = {
              componentId: props.componentId, 
              collectionRefIdx, args: item.args, pageComponents, currentPageState, sharedState,              
              dispatch, snackbar, router, container, prevExecutionState: lastActionResult.result, pagination
            }

            try {  
              lastActionResult = await item.action.execute(actionExecutionContext);
            } catch (error) {
              console.log(error);
              return;
            }
          }           
        }

        await dispatch.app.setGlobalLoaderDisabled({});
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!!onChangeHandler) {
          onChangeHandler.execute(
            props._x_name,
            [],
            e.target.value,
            currentPageState,
            dispatch,
          );
        }
      },
    };
  }

  return targetProps;
};
