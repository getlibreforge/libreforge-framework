import { useContext } from 'react';
import { InversifyContainerProviderContext } from '../utils/inversify';
import { ProviderFactory } from '../utils/ProviderFactory';
import { AbstractAction } from '../actions';

export const usePropBasedActions = (actionPropNames: string[] = [], props: any): { action: AbstractAction, args: any }[] => {
  const container = useContext(InversifyContainerProviderContext);
  const factory = new ProviderFactory(container);

  const { designMode } = props;
  const actions: { action: AbstractAction, args: any }[] = [];

  if (false === designMode) {

    const getArgsByAction = (actionPropName: string, actionName: string, props: any): any => {
      const action = factory.getActionHandlerByName(actionName);
      if (!action) {
        return {};
      }

      const targetArgs: any = {};
      const args = action.getArgsDefinition();
      args.forEach(a => {
        targetArgs[a.name] = props[`${actionPropName}_${a.name}`];
      });
      
      return targetArgs;
    }

    actionPropNames.forEach(propName => {
      const actionName = props[propName];
      const action = factory.getActionHandlerByName(actionName);

      if (!!action) {
        const args = getArgsByAction(propName, actionName, props);
        actions.push({ action, args });
      }
    })
  }

  return actions;
};
