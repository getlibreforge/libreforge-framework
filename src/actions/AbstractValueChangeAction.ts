import 'reflect-metadata';
import { injectable } from 'inversify';
import { RematchDispatch } from '@rematch/core';

export const SYMBOL_VALUE_CHANGE_ACTION = 'ValueChangeAction';

@injectable()
export abstract class AbstractValueChangeAction {

  abstract getName(): string;

  abstract execute(
    componentName: string,
    params: string[],
    value: any,
    currentPageState: any,
    dispatch: RematchDispatch<any>,
  ): void;
}
