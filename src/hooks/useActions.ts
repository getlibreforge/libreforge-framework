import { useContext } from 'react';
import { InversifyContainerProviderContext } from '../utils/inversify';
import { ProviderFactory } from '../utils/ProviderFactory';
import { AbstractAction } from '../actions';
import { IActionGroup } from '@libreforge/libreforge-framework-shared';

export const useActions = (actionGroup: IActionGroup, props: any): { action: AbstractAction, args: any }[] => {

  const container = useContext(InversifyContainerProviderContext);
  const factory = new ProviderFactory(container);

  const { designMode } = props;
  const actions: { action: AbstractAction, args: any }[] = [];

  if (false === designMode) {

    const getArgsByAction = (actionIdx: string, actionGroup: IActionGroup): any => {
      const targetArgs: any = {};
      const args = Object.keys(actionGroup[actionIdx].params);

      args.forEach(arg => {
        targetArgs[arg] = actionGroup[actionIdx].params[arg];
      });
      
      return targetArgs;
    }

    const actionIndexes = Object.keys(actionGroup);

    actionIndexes.forEach(actionIdx => {
      const actionName = actionGroup[actionIdx].action;
      const action = factory.getActionHandlerByName(actionName);

      if (!!action) {
        const args = getArgsByAction(actionIdx, actionGroup);
        actions.push({ action, args });
      }
    })
  }

  return actions;
};
