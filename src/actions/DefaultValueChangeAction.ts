import 'reflect-metadata';
import { injectable } from 'inversify';
import { RematchDispatch } from '@rematch/core';
import { AbstractValueChangeAction } from './AbstractValueChangeAction';

@injectable()
export class DefaultValueChangeAction extends AbstractValueChangeAction {
  name = 'DefaultValueChange';

  getName() {
    return this.name;
  }

  execute(
    componentName: string,
    params: string[],
    value: any,
    currentPageState: any,
    dispatch: RematchDispatch<any>,
  ) {

    /* TODO: Clean error, if field is touched */

    /* TODO: emit event */

    /* Set value */
    dispatch.app.changeCurrentPageState({ name: componentName, value });
    dispatch.app.setLastApplicationEvent({ type: 'VALUE_CHANGED', timespamp: new Date().getTime() });
  }
}
