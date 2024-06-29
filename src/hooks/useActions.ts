import { useContext } from 'react';
import { InversifyContainerProviderContext } from '../utils/inversify';
import { ProviderFactory } from '../utils/ProviderFactory';
import { AbstractAction } from '../actions';
import { IAction, IActionGroup } from '@libreforge/libreforge-framework-shared';

export const useActions = (actionGroup: IActionGroup, props: any): { action: AbstractAction, args: any }[] => {

  const container = useContext(InversifyContainerProviderContext);
  const factory = new ProviderFactory(container);

  const { designMode } = props;
  const actions: { action: AbstractAction, args: any }[] = [];

  if (false === designMode) {

    const getActionConfigByName = (actionName: string, actionGroup: IActionGroup): IAction | undefined => {
      return Object.keys(actionGroup).map(key => {
        const action = actionGroup[key];
        return { name: action.action, action }
      }).filter(item => item.name === actionName).map(item => item.action)?.[0]
    }

    const getArgsByAction = (actionName: string, actionGroup: IActionGroup): any => {
      const action = getActionConfigByName(actionName, actionGroup);
      if (!action) {
        return {};
      }

      const targetArgs: any = {};
      const args = Object.keys(action.params);

      args.forEach(arg => {
        targetArgs[arg] = action.params[arg];
      });
      
      return targetArgs;
    }

    const actionNames = Object.keys(actionGroup).map(key => actionGroup[key].action)
    actionNames.forEach(actionName => {
      const action = factory.getActionHandlerByName(actionName);

      if (!!action) {
        const args = getArgsByAction(actionName, actionGroup);
        actions.push({ action, args });
      }
    })
  }

  return actions;
};
